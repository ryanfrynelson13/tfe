import { useState } from "react"
import { TicketPrice } from "../../types/ticket-prices/ticket-price.type"
import classes from './ticket.module.css'

type TicketProps = TicketPrice & {
    nb: number
    onNumberChange: (id: number,step: number, price: number) => void
}

const Ticket = ({id, pricePerTicket, title, nbPlaces, nb, onNumberChange}: TicketProps) => {

    return(
        <div className={classes.ticket}>
            <p>{title}</p>
            <p>{pricePerTicket.toFixed(2)}€</p>
            <div className={classes['change-nb']}>
                <button onClick={() => onNumberChange(id, -nbPlaces, pricePerTicket)}>-</button>
                <p>{nb}</p>
                <button onClick={() => onNumberChange(id, nbPlaces, pricePerTicket)}>+</button>
            </div>
        </div>
    )
}

export default Ticket