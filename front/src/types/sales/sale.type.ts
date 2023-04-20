import { Ticket } from "../tickets/ticket.type"

export type Sale = {
    id: number
    createdAt: string
    tickets: Ticket[]
}