import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email, userId }) => {
    return <section className="employee">
        <div>
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
        </div>
        <div>{userId}</div>
        <div>Email: {email}</div>
    </section>
}