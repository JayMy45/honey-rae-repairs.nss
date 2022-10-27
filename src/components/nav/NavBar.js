
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localHoneyUser = localStorage.getItem("honey_customer")
    const honeyUserObject = JSON.parse(localHoneyUser)


    if (honeyUserObject.staff) {
        //Return Employee views
        return <EmployeeNav />
    } else {
        //Return Customer Vies
        return <CustomerNav />
    }

}

