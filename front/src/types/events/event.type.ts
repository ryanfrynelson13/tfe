import { TicketPrice } from "../ticket-prices/ticket-price.type"

export type Event = {
    id: number
    title: string
    imageUrl: string
    tickets: TicketPrice[]
    reviews: Review[]
}