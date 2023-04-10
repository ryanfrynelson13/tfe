import { EventType } from "../events/event.type"

export type User = {
    id: number
    email: string
    username: string
    avatar: string | null
    favorites: EventType[]
    permission: {
        id: number
        title: string
        canCreate: boolean
        canUpdate: boolean
        canSave: boolean
    }
}