import { Category } from "../categories/category.type";
import { Location } from "../locations/location.type";
import { Session } from "../sessions/session.type";
import { EventType } from "./event.type";

export type DetailledEvent = EventType & {
    startDate: string
    endDate: string
    intro: string
    description: string
    duration: string
    places: number
    location: Location
    sessions: Session[]
    category: Category
}