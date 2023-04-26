import { EventType } from "../events/event.type"

export type Session = {
    id: number
    startTime: string
    placesLeft: number
    event?: EventType
}