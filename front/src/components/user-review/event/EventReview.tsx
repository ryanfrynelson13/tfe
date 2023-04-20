import { useNavigate } from "react-router-dom"
import { EventType } from "../../../types/events/event.type"
import classes from './event-reviews.module.css'

const EventReview = ({title, imageUrl, id}:EventType) => {

    const navigate = useNavigate()

    return(
        <div className={classes.title} onClick={() => navigate(`/event/${id}`)}>
            <div>
                <img src={imageUrl} alt="" />
            </div>
            <p>{title}</p>
        </div>
    )
}

export default EventReview