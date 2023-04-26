import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { EventType } from "../../types/events/event.type"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { getToken } from "../../utils/token.util"

const useUserEvents = () => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [events, setEvents] = useState<{ended: boolean, event: EventType}[] | null>()

    useEffect(() => {
        getEvents()

        return () => {
            setLoading(true)
            setEvents(null)
            setError(null)
        }
    },[])
    let getEvents = async() => {
        try {
            const token = getToken()
            if(token){
                const {data} = await axios.get<{ended: boolean, event: EventType}[]>(USERS_URLS.events, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setLoading(false)
                setEvents(data)
            }
            else{
                setLoading(false)
                setEvents([])
            }
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, events, error}
}

export default useUserEvents