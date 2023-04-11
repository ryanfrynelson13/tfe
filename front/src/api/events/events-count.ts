import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"

 export const getEventsCount =async () => {
    const {data} = await axios.get<number>(EVENT_URLS.count)

    return data
 }