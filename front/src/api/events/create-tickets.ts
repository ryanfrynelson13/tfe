import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"

type Tickets = {
    type: string
    checked: boolean
    price: number
}

export const createTickets =async (eventId: number, tickets: Tickets[]) => {

    for(const ticket of tickets){

        if(ticket.checked){
            const body = {
                eventId,
                ticket: {
                    pricePerTicket: ticket.price,
                    title: ticket.type,
                    nbPlaces: 1
                }
            }
            await axios.post(EVENT_URLS.ticketPrice, body)
        }
    }

    return 'done'
}