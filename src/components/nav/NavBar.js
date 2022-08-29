import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            {
                localStorage.getItem("honey_user")  //turnary statement on line 14 (?)...WHAT
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {  //custom onClick that removes "honey_users" from localStorage.removeItem!!
                            localStorage.removeItem("honey_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>        // ^ creates custom link (imported)
                    : ""
            }
        </ul>
    )
}

