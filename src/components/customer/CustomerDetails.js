import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Customer.css"

export const CustomerDetails = () => {

    const { customerId } = useParams()
    const [customerDetails, setCustomerDetails] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=employeeTickets&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    setCustomerDetails(singleCustomer)
                })
        },
        [customerId]
    )

    return <section className="customer">
        <header className="customer__header">{customerDetails?.user?.fullName}</header>
        <div>Email: {customerDetails?.user?.email}</div>
        <div>Phone: {customerDetails.phoneNumber}</div>

        <footer className="customerDetails__footer">Address: {customerDetails.address}</footer>

    </section>
}