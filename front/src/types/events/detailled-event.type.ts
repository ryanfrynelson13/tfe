import { Category } from "../categories/category.type";
import { LocationType } from "../locations/location.type";
import { Session } from "../sessions/session.type";
import { EventType } from "./event.type";

export type DetailledEvent = EventType & {
    startDate: string
    endDate: string
    intro: string
    description: string
    duration: number
    places: number
    location: LocationType
    sessions: Session[]
    category: Category
}