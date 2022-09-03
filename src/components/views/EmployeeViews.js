import { Outlet, Route, Routes } from "react-router-dom" //where in the hell is this????  AND wtf do they do???
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { TicketContainer } from "../tickets/TicketContainer"



//this function renders the <TicketList> component.
export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repairs</h1>
                    <div>Your one-stop shop for repairing your tech</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketContainer />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />

            </Route>
        </Routes>
    )
}



//TicketSearch and TicketList are siblings