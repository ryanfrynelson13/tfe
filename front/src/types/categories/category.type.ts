import { EventType } from "../events/event.type"

export type Category = {
    id: number
    category: string
    imageUrl: string
    events?: EventType[]
}