import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { DetailledEvent } from "../../types/events/detailled-event.type"

const useEvent = (id: string | number) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [event, setEvent] = useState<DetailledEvent | null>(null)

    useEffect(() => {
        getEvent()
    },[id])
    
    let getEvent = async() => {
        try {
            const {data} = await axios.get<DetailledEvent>(EVENT_URLS.events + id)
            setLoading(false)
            setEvent(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, event, error}
}

export default useEvent