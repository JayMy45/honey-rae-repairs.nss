import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customer</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profiles">Profile</Link>
            </li>

            {
                localStorage.getItem("honey_customer")  //ternary statement on line 14 (?)...WHAT
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {  //custom onClick that removes "honey_customers" from localStorage.removeItem!!
                            localStorage.removeItem("honey_customer")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>        // ^ creates custom link (imported)
                    : ""
            }
        </ul>
    )
}

