import { TicketPrice } from "../ticket-prices/ticket-price.type"

export type BasketType = {
    products: BasketProduct[]
    total: number
}

export type BasketProduct = {
    eventId: number
    sessionId: number
    tickets:  BasketTicket[]
}

type BasketTicket = TicketPrice & {
    nb: number
}