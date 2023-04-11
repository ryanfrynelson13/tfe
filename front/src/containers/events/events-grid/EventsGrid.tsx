import { useEffect, useState } from "react"
import EventCard from "../../../components/event/event-card/EventCard"
import useEvents from "../../../hooks/events/useEvents"
import { EventType } from "../../../types/events/event.type"
import classes from './events-grid.module.css'
import { getEventsCount } from "../../../api/events/events-count"
import Pagination from "../../../components/pagination/Pagination"


const EventsGrid = () => {   
    
    const [eventCount, setEventCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    
    const {isLoading, events, error} = useEvents('24', page)

    const changePage = (page: number) => {
        setPage(page)
    }

    useEffect(() => {
        getEventsCount()
            .then(count => setEventCount(count))
    },[])

    const eventsMap = events?.map((event: EventType) => (
        <EventCard {...event} key={event.id}/>
    ))

    return isLoading?
    (
        <div>
            Loading
        </div>
    )
    :
    (   
        <>
            <div className={classes.grid}>
                {eventsMap}
            </div>  
            <Pagination onPage={changePage} count={eventCount}/>         
        </>
    )
}

export default EventsGrid