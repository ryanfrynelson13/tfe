import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { Event } from "../../types/events/event.type"

const useSearch = (q: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        if(q !== ''){
            getEvents()
        }
    },[q])
    let getEvents = async() => {
        try {
            const {data} = await axios.get<Event[]>(EVENT_URLS.getSearchedEvents +'?q=' + q)
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