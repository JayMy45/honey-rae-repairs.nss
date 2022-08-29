//code provided from lesson...typed not copy/pasted
import { useEffect, useState } from "react"  //Where in the hell are these from.../imgres
import "./Tickets.css"  //import css styling files directly from ticket.css within tickets folder.

export const TicketList = () => {
    const [tickets, setTickets] = useState([])  //useState([]) is a function provided by React to store the state in a component returning an array that contains the initial state value at index 0  and a function that modifies the state at index 1(?).
    // ^deconstructuring the useState() function...

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`) //go get all tickets
                .then(response => response.json()) //get response back
                .then((ticketArray) => {
                    setTickets(ticketArray)  //setTickets is destructured above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (on is a string the other a parameter from deconstructed variable above)
        },
        [] //When this array is empty, you are observing initial component state...initial state to display after fetch call...
    )
    return <>

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                tickets.map(
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

