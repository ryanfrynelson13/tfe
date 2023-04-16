import { useState } from "react"
import { Session as SessionType } from "../../types/sessions/session.type"
import { TicketPrice } from "../../types/ticket-prices/ticket-price.type"
import classes from './session.module.css'
import * as dayjs from 'dayjs'
import Ticket from "../ticket/Ticket"

type SessionProps = SessionType & {
    tickets: TicketPrice[]
    display: {id: number, display: boolean}
    onDisplay: (id: number) => void
}

const Session = ({id, startTime, tickets, display, onDisplay}: SessionProps) => {
    
    const ticketsMap = tickets?.map(ticket => (
        <Ticket key={ticket.id} {...ticket}/>
    ))

    return(
        <div className={classes.session}>
            <div className={classes.time} onClick={() => onDisplay(id)}>
                <p>                    
                    {dayjs(startTime).hour()}H{dayjs(startTime).minute() < 10  && '0'}{dayjs(startTime).minute()}
                </p>
            </div>
            {
                display?.display && 
                <div className={classes.tickets}>
                    {ticketsMap}
                </div>
            }
        </div>
    )
}

export default Session