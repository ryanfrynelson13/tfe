import { CategoryEntity } from "src/core/models/entities/category.entity"
import { ReviewEntity } from "src/core/models/entities/review.entity"
import { TicketPriceEntity } from "src/core/models/entities/ticket-price.entity"

export type EventType = {
    title: string
    imageUrl?: string
    startDate?: string
    endDate: string
    intro: string 
    description: string 
    duration: number
    places: number
    lowestPrice?: number
    avgStars?: number
    tickets?: TicketPriceEntity[]
    reviews?: ReviewEntity[]
    category?: CategoryEntity
}
