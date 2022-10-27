import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"


export const Profile = () => {

    const localHoneyUser = localStorage.getItem("honey_customer")
    const honeyUserObject = JSON.parse(localHoneyUser)


    if (honeyUserObject.staff) {
        //Return Employee views
        return <EmployeeForm />
    } else {
        //Return Customer Vies
        return <CustomerForm />
    }

}

