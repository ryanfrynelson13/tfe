import { Sale } from "../sales/sale.type"
import { Session } from "../sessions/session.type"
import { TicketPrice } from "../ticket-prices/ticket-price.type"

export type Ticket = {
    id: number
    session?: Session
    sale?: Sale
    ticketPrice?: TicketPrice
}