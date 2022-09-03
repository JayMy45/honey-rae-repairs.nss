import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")  //two sibling components can not talk directly to each other they have to go through a parent...?

    return <>
        < TicketSearch setterFunction={setSearchTerms} />
        <TicketList searchTermState={searchTerms} />
    </>

}