import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"



//this function renders the <TicketList> component.
export const ApplicationViews = () => {

	const localHoneyUser = localStorage.getItem("honey_customer")
	const honeyUserObject = JSON.parse(localHoneyUser)


	if (honeyUserObject.staff) {
		//Return Employee views
		return <EmployeeViews />
	} else {
		//Return Customer Vies
		return <CustomerViews />
	}

}


//TicketSearch and TicketList are siblings