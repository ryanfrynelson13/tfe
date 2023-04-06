import EventDescription from "../../../components/event/event-description/EventDescription"
import EventDetails from "../../../components/event/event-details/EventDetails"
import { DetailledEvent } from "../../../types/events/detailled-event.type"
import classes from './event-info.module.css'

type EventInfoProps = {
    event: DetailledEvent
}


const EventInfo = ({event}:EventInfoProps) => {
    return(
        <div className={classes.info}>
            <EventDescription {...event}/>
            <EventDetails {...event}/>
        </div>
    )
}

export default EventInfo