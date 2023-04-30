import { useEffect, useState } from "react"
import EventCard from "../../../components/event/event-card/EventCard"
import useEvents from "../../../hooks/events/useEvents"
import { EventType } from "../../../types/events/event.type"
import classes from './events-grid.module.css'
import Pagination from "../../../components/pagination/Pagination"
import SortBy from "../../../components/sort-by/SortBy"
import useEventCount from "../../../hooks/events/useEventCount"
import { useSetRecoilState } from "recoil"
import { displayFilters } from "../../../atoms/display-filters.atom"
import Spinner from "../../../components/spinner/Spinner"


const EventsGrid = () => {   
    
    const setDisplayFilters = useSetRecoilState(displayFilters)

    const eventCount = useEventCount()
    const [page, setPage] = useState<number>(1)
    const [orderBy, setOrderBy] = useState('date')
    
    const {isLoading, events, error} = useEvents(24, page, orderBy)    

    

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
            <Spinner height={'60vh'}/>
        </div>
    )
    :
    (   
        <>
            <div className={classes.options}>
                <div className={classes.filters}>
                    <button onClick={() => setDisplayFilters(true)}>Filters</button>
                </div>
                <SortBy order={orderBy} onSort={changeOrder}/>
            </div>
            <div className={classes.grid}>
                {eventsMap}
            </div>  
            {eventCount > 1 && <Pagination page={page} onPage={changePage} count={eventCount}/>}       
        </>
    )
}

export default EventsGrid