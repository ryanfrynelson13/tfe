import { DetailledEvent } from "../../../types/events/detailled-event.type"
import classes from './event-details.module.css'

const EventDetails = ({startDate, endDate, location, category, duration, places}:DetailledEvent) => {
    return(
        <div className={classes.details}>
            <ul>
                <li className={classes.title}>
                   <p>Details</p> 
                </li>
                <li>
                    <p>Start Date:</p>  
                    <p className={classes.bold}>{startDate}</p>
                </li>
                <li>
                    <p>End Date:</p>  
                    <p className={classes.bold}>{endDate}</p>
                </li>
                <li>
                    <p>Location: </p>  
                    <p className={classes.bold}>{`${location.number} ${location.street}, ${location.postalCode} ${location.country}`}</p>
                </li>
                <li>
                    <p>Type: </p>  
                    <p className={classes.bold}>{category.category}</p>
                </li>
                <li>
                    <p>Organizer:</p>  
                    <p className={classes.bold}>{location.name}</p>
                </li>
                <li>
                    <p>Duration:</p>  
                    <p className={classes.bold}>{duration}</p>
                </li>
                <li>
                    <p>Places:</p>  
                    <p className={classes.bold}>{places}</p>
                </li>
            </ul>
        </div>
    )
}

export default EventDetails