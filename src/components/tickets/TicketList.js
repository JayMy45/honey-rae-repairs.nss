//code provided from lesson...typed not copy/pasted
import { useEffect, useInsertionEffect, useState } from "react"  //Where in the hell are these from.../imgres
import "./Tickets.css"  //import css styling files directly from ticket.css within tickets folder.

export const TicketList = () => {
    const [tickets, setTickets] = useState([])  //  initial State set to empty array -- useState([]) is a function provided by React to store the state in a component returning an array that contains the initial state value at index 0  and a function that modifies the state at index 1(?).
    // ^deconstructuring the useState() function...

    const [filteredTickets, setFiltered] = useState([])


    const localHoneyUser = localStorage.getItem("honey_user")  //this variable holds object created whenever logged in which honey_user: which is created whenever a authorized user logs in with email (Login.js lines 18-20)
    const honeyUserObject = JSON.parse(localHoneyUser) //converts JSON data to object that can be used code-side


    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`) //go get all tickets
                .then(response => response.json()) //get response back
                .then((ticketArray) => {
                    setTickets(ticketArray)  //setTickets is destructured above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (on is a string the other a parameter from deconstructed variable above)
        },
        []  // < after initial state was set usEffect fetched data from API and updated state...
        //When this array is empty, you are observing initial component state...initial state to display after fetch call...
    )
    // ? whenever state changes we need to observe ticket state.

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //for customers
                setFiltered(tickets)
            }
            else {
                //for Employees
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)

            }
        },
        [tickets]
    )

    return <>

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

