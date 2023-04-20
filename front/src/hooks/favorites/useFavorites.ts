import { useEffect, useState } from "react"
import { EventType } from "../../types/events/event.type"
import axios from "axios"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { getToken } from "../../utils/token.util"


const useFavorites = () => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [favorites, setEvents] = useState<EventType[]>([])

    useEffect(() => {
        getEvents()
    },[])
    let getEvents = async() => {
        try {
            const token = getToken()
            const {data} = await axios.get<EventType[]>(USERS_URLS.favorites,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLoading(false)
            setEvents(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    return {isLoading, favorites, error}
}

export default useFavorites