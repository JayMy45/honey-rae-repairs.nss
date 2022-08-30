//code provided from lesson...typed not copy/pasted
import { useEffect, useState } from "react"  //Where in the hell are these from...
import { useNavigate } from "react-router-dom"
import "./Tickets.css"  //import css styling files directly from ticket.css within tickets folder.

export const TicketList = () => {
    const [tickets, setTickets] = useState([])  //  initial State set to empty array -- useState([]) is a function provided by React to store the state in a component returning an array that contains the initial state value at index 0  and a function that modifies the state at index 1(?).
    // ^deconstructuring the useState() function...

    const [filteredTickets, setFiltered] = useState([])
    //^ to display a list of tickets without modifying "tickets" variable above

    const [emergency, setEmergency] = useState(false) //set state equal to false b/c we don't want the state to filter straightaway
    //^ to display a list of emergency tickets...

    const [openOnly, updateOpenOnly] = useState(false)

    const navigate = useNavigate() //used for navigation...

    const localHoneyUser = localStorage.getItem("honey_user")  //this variable holds object created whenever logged in which honey_user: which is created whenever a authorized user logs in with email (Login.js lines 18-20)
    const honeyUserObject = JSON.parse(localHoneyUser) //converts JSON data to object that can be used code-side




    // & Emergency
    useEffect(
        () => { //updated conditionals to only be available to staff members!!!
            if (emergency && honeyUserObject.staff === true) { //if the array emergency is true
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true) //then emergencyTickets 
                setFiltered(emergencyTickets)  //use setterFunction setFiltered() to display emergencyTicket with .emergency info...
            } else if (honeyUserObject.staff === true) {
                // (honeyUserObject.staff === true)
                setFiltered(tickets)
            }
        },
        [emergency]
    )


    // & initial state (empty)
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`) //go get all tickets
                .then(response => response.json()) //get response back from server
                .then((ticketArray) => {
                    setTickets(ticketArray)  //setTickets is deconstructured above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (one is a string the other a parameter from deconstructed variable above)
        },
        []  // < after initial state was set useEffect fetched data from API and updated state...
        //When this array is empty, you are observing initial component state...initial state to display after fetch call...
    )

    // & tickets 
    // ? whenever state changes we need to observe ticket state using the useEffect Method.
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //for customers
                setFiltered(tickets) //shows all tickets if the user is a staff member
            }
            else {
                //for Employees
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)

                setFiltered(myTickets)

            }
        },
        [tickets] //what useEffect is watching for specific state variable 
    )

    // & Open Only
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    return <>
        {

            honeyUserObject.staff //ternary statement added to show buttons whenever logged in as a employee. (08/30 @ 10:07amS)
                // & if employee show these buttons below
                ? <>

                    <button
                        onClick={  //onClick function sets state of setEmergency to true...
                            () => {
                                setEmergency(true)
                            }
                        } >Emergency Only</button>

                    <button
                        onClick={  //onClick function sets state of setEmergency to false...
                            () => {
                                setEmergency(false)
                            }
                        }
                    >Show all</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => { updateOpenOnly(true) }} >Open Ticket</button>
                    <button onClick={() => { updateOpenOnly(false) }}>All My Tickets</button>
                </>

            //create "Open Ticket" and "All My Tickets" buttons...this ternary function already distinguishes between customer and employee

            //& clicking this button will change the route to ticket/create (when button is clicked)... (navigate defined above and route )
        }


        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => { //callback function begin
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "NO"}</footer>
                        </section>
                    } //callback function ends
                )
            }
        </article>

    </>
}




/*   
? CLEAN VERSION OF onClick EVENT LISTENERS FROM EMERGENCY BUTTONS
        { 
            honeyUserObject.staff
            ? <> 
                < button onClick={() => setEmergency(true)}> Emergency Only</button>
                <button onClick={() => setEmergency(false)} >Show All</button>
            </>
            :<button onClick={() => navigate("/ticket/create")}> Create Ticket</button>
}

if a staff member is logged in then "Emergency Only"/"Show All" buttons will display (with functions)...
else the "Create Ticket" button will appear for customers (if not a employee that signed in it must be a customer).

^whenever button is "Create Ticket" button is clicked the programs routes to /ticket/create (in ApplicationsViews) where the route is defined as TicketForm...there the form will be rendered.

How do websites handle guests...if not storing the data from users in the API...is there a short term memory options for GUESTs?
*/