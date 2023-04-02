import { ReviewType } from "./review.type"

export type NewReviewType = {
    review: ReviewType
    userId: number
    eventId: number
}