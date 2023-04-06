import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { EventType } from "../../types/events/event.type"

const useEvents = (limit: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [events, setEvents] = useState<EventType[]>([])

    useEffect(() => {
        getEvents()
    },[])
    let getEvents = async() => {
        try {
            const {data} = await axios.get<EventType[]>(EVENT_URLS.events +'?limit=' + limit)
            setLoading(false)
            setEvents(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, events, error}
}

export default useEvents