import { useState } from "react"
import { TicketPrice } from "../../types/ticket-prices/ticket-price.type"
import classes from './ticket.module.css'

const Ticket = ({id, pricePerTicket, title, nbPlaces}: TicketPrice) => {

    const [nbTickets, setNbTickets] = useState<number>(0)


    return(
        <div className={classes.ticket}>
            <p>{title}</p>
            <p>{pricePerTicket.toFixed()}€</p>
            <div className={classes['change-nb']}>
                <button onClick={() => {setNbTickets(nb => nb - nbPlaces > 0 ? nb - nbPlaces : 0)}}>-</button>
                <p>{nbTickets}</p>
                <button onClick={() => {setNbTickets(nb => nb + nbPlaces)}}>+</button>
            </div>
        </div>
    )
}

export default Ticket