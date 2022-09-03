import { Outlet, Route, Routes } from "react-router-dom" //where in the hell is this????  AND wtf do they do???
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"



//this function renders the <TicketList> component.
export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repairs</h1>
                    <div>Your one-stop shop for repairing your tech</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketList />} />

                <Route path="ticket/create" element={<TicketForm />} />
				   // ^ watches browser URL and displays the correct component (ApplicationViews Module)...helps to know which module/
            </Route>
        </Routes>
    )
}



//TicketSearch and TicketList are siblings