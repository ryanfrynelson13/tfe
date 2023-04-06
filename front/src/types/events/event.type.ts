import { TicketPrice } from "../ticket-prices/ticket-price.type"

export type EventType = {
    id: number
    title: string
    imageUrl: string
    tickets: TicketPrice[]
    reviews: Review[]
}