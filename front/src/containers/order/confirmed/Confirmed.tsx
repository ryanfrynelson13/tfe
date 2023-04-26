import { useLocation } from "react-router-dom"
import classes from './confirmed.module.css'
import usetickets from "../../../hooks/events/useTickets"
import { Ticket } from "../../../types/tickets/ticket.type"
import * as dayjs from 'dayjs'

const SaleTicket = ({session, ticketPrice}:Ticket) => (
    <div className={classes.ticket}>        
        <p className={classes.title}>{session?.event?.title}</p>
        <p>{ticketPrice?.title}</p>
        <p>{dayjs(session?.startTime).format('DD/MM/YY HH:mm').toString()}</p>
        <p>{ticketPrice?.pricePerTicket.toFixed(2)} €</p>
        <div className={classes.qr}>
            <img src="https://www.disabled-world.com/pics/1/dw-qr-code.png" alt="" />   
        </div>
    </div>
)

const Confirmed = () => {

    const {state} = useLocation()
    const {sale} = state 

    const {isLoading, tickets} = usetickets(sale.id)
    
    const ticketsMap = tickets?.map(ticket => (
       <SaleTicket key={ticket.id} {...ticket} />
    ))
    
    return(
        <div className={classes.sale}>
            <div>
                <h3>Order number {sale.id}</h3>
                <h3>Your Tickets</h3>
            </div>
            <div>
                {
                    isLoading ? 
                    'Loading...':
                    ticketsMap
                }
            </div>
            <div>
                <p>Total: {sale.total.toFixed(2)}€</p>
            </div>
        </div>
    )
}

export default Confirmed