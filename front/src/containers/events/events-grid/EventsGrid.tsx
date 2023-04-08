import EventCard from "../../../components/event/event-card/EventCard"
import { EventType } from "../../../types/events/event.type"
import classes from './events-grid.module.css'

type EventsGridProps = {
    isLoading: boolean
    events: EventType[] | null | undefined,
    error: any
}

const EventsGrid = ({isLoading, events, error}: EventsGridProps) => {    
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
        <div className={classes.grid}>
            {eventsMap}
        </div>
    )
}

export default EventsGrid