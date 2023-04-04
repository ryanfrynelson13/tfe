import EventCard from "../../../components/event/event-card/EventCard"
import useEvents from "../../../hooks/events/useEvents"
import { Event } from "../../../types/events/event.type"
import classes from './events-grid.module.css'


const EventsGrid = () => {
    const {isLoading, events, error} = useEvents('24')
    const eventsMap = events?.map((event: Event) => (
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
        <div className={classes.grid}>
            {eventsMap}
        </div>
    )
}

export default EventsGrid