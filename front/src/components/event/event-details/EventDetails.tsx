import { DetailledEvent } from "../../../types/events/detailled-event.type"
import classes from './event-details.module.css'

const EventDetails = ({startDate, endDate, location, category, duration, places}:DetailledEvent) => {
    return(
        <div className={classes.details}>
            <ul>
                <li className={classes.title}>
                   <p>Details</p> 
                </li>
                <li>Start Date: {startDate}</li>
                <li>End Date: {endDate}</li>
                <li>Location: {`${location.number} ${location.street}, ${location.postalCode} ${location.country}`}</li>
                <li>Type: {category.category}</li>
                <li>Organizer: {location.name}</li>
                <li>Duration: {duration}</li>
                <li>Places: {places}</li>
            </ul>
        </div>
    )
}

export default EventDetails