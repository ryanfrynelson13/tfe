import { EventType } from "./event.type"

export type NewEventType = {
    event: EventType,
    categoryId: number,
    locationId: number
}