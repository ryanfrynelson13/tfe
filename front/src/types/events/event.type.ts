import { Review } from "../reviews/review.type"
import { TicketPrice } from "../ticket-prices/ticket-price.type"

export type EventType = {
    id: number
    title: string
    imageUrl: string
    startDate: string
    tickets: TicketPrice[]
    reviews: Review[]
}