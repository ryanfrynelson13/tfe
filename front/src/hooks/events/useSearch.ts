import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { EventType } from "../../types/events/event.type"

const useSearch = (q: string, limit: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [events, setEvents] = useState<EventType[]>([])

    useEffect(() => {
        if(q !== ''){
            getEvents()
        } else{
            setEvents([])
        }
    },[q])
    let getEvents = async() => {
        try {
            const {data} = await axios.get<EventType[]>(EVENT_URLS.getSearchedEvents +'?q=' + q +'&limit=' + limit)
            setLoading(false)
            setEvents(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }
    return {isLoading, events, error}
}

export default useSearch