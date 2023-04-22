import { Address } from "../addresses/address.type"
import { EventType } from "../events/event.type"

export type User = {
    id: number
    email: string
    username: string
    avatar: string | null
    firstname: string | null
    lastname: string | null
    favorites: EventType[]
    permission: {
        id: number
        title: string
        canCreate: boolean
        canUpdate: boolean
        canSave: boolean
    }
    addresses: Address[]
}