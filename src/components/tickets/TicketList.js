//code provided from lesson...typed not copy/pasted
import { useEffect, useInsertionEffect, useState } from "react"  //Where in the hell are these from.../imgres
import "./Tickets.css"  //import css styling files directly from ticket.css within tickets folder.

export const TicketList = () => {
    const [tickets, setTickets] = useState([])  //  initial State set to empty array -- useState([]) is a function provided by React to store the state in a component returning an array that contains the initial state value at index 0  and a function that modifies the state at index 1(?).
    // ^deconstructuring the useState() function...

    const [filteredTickets, setFiltered] = useState([])
    //^ to display a list of tickets without modifying "tickets" variable above

    const [emergency, setEmergency] = useState(false) //set state equal to false b/c we don't want the state to filter straightaway
    //^ to display a list of emergency tickets...

    const localHoneyUser = localStorage.getItem("honey_user")  //this variable holds object created whenever logged in which honey_user: which is created whenever a authorized user logs in with email (Login.js lines 18-20)
    const honeyUserObject = JSON.parse(localHoneyUser) //converts JSON data to object that can be used code-side


    useEffect(
        () => {
            if (emergency) { //if the array emergency is true
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true) //then emergencyTickets 
                setFiltered(emergencyTickets)  //ue setterFunction setFiltered() to display emergencyTicket with .emergency info...
            }
        },
        [emergency]
    )

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

    return <>
        <button
            onClick={  //onClick function sets state of setEmergency to true...
                () => {
                    setEmergency(true)
                }
            } >Emergency Only</button>

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

