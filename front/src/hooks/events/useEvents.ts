import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { EventType } from "../../types/events/event.type"
import { useRecoilValue } from "recoil"
import { filtersAtom } from "../../atoms/filters.atom"

const useEvents = (limit: number, page: number, sortBy: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [events, setEvents] = useState<EventType[] | null>()
    const filters = useRecoilValue(filtersAtom)

    useEffect(() => {
        getEvents()

        return () => {
            setLoading(true)
            setEvents(null)
            setError(null)
        }
    },[page, limit,sortBy, filters])
    let getEvents = async() => {
        try {
            const params = {
                limit,
                page,
                sortBy
            }
            const {data} = await axios.post<EventType[]>(EVENT_URLS.events,{
                ...filters
            } ,{
                params: params
            })
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