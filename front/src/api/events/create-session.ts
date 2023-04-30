import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"


export const createSession =async (eventId: number, startTime: string) =>{

    const {data} = await axios.post(EVENT_URLS.sessions,{eventId, startTime})

    return data
}