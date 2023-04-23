import { TicketPrice } from "../ticket-prices/ticket-price.type"

export type BasketType = {
    products: BasketProduct[]
    checkOutTotal: number
    total: number
}

export type BasketProduct = {
    eventId: number
    sessionId: number
    tickets:  BasketTicket[]
    checkOut: boolean
}

type BasketTicket = TicketPrice & {
    nb: number
}