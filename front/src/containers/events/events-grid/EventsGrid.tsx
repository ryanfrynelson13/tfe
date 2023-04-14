import { useEffect, useState } from "react"
import EventCard from "../../../components/event/event-card/EventCard"
import useEvents from "../../../hooks/events/useEvents"
import { EventType } from "../../../types/events/event.type"
import classes from './events-grid.module.css'
import { getEventsCount } from "../../../api/events/events-count"
import Pagination from "../../../components/pagination/Pagination"
import SortBy from "../../../components/sort-by/SortBy"


const EventsGrid = () => {   
    
    const [eventCount, setEventCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [orderBy, setOrderBy] = useState('date')
    
    const {isLoading, events, error} = useEvents(24, page, orderBy)    

    useEffect(() => {
        getEventsCount()
            .then(count => setEventCount(count))
    },[])

    const changePage = (page: number) => {
        setPage(page)
    }

    const changeOrder = (order: string) => {
        setOrderBy(order)
        setPage(1)
    }

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
            <div className={classes.options}>
                <SortBy order={orderBy} onSort={changeOrder}/>
            </div>
            <div className={classes.grid}>
                {eventsMap}
            </div>  
            {eventCount > 1 && <Pagination onPage={changePage} count={eventCount}/>}       
        </>
    )
}

export default EventsGrid