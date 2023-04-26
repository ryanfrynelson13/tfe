import axios from "axios"
import { getToken } from "../../utils/token.util"
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { DetailledEvent } from "../../types/events/detailled-event.type"

type NewEventType = {
    event: {
        startDate: string
        endDate: string
        intro: string
        description: string
        duration: number
        places: number
    },
    categoryId: number,
    locationId: number
}

export const createEvent =async (body: NewEventType) => {

    const token = getToken()
    const {data}= await axios.post<DetailledEvent>(EVENT_URLS.events + 'create', body , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}