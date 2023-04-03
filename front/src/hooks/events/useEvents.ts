import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import axios from 'axios'
import { URLS } from "../../enums/urls.enum"
import { Event } from "../../types/events/event.type"

const useEvents = (limit: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        getEvents()
    },[])
    let getEvents = async() => {
        try {
            const {data} = await axios.get<Event[]>(URLS.getEvents +'?limit=' + limit)
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