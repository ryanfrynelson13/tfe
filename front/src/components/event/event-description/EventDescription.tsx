import { useMemo } from "react";
import { DetailledEvent } from "../../../types/events/detailled-event.type";
import classes from './event-description.module.css'

const EventDescription = ({imageUrl, intro, description, reviews}: DetailledEvent) => {

    const stars = useMemo(() => {
        return reviews.length >0 ? reviews.reduce((total, {stars}) => {
           return  total + stars
        }, 0)/ reviews.length : 0
    },[reviews])

    return(
        <div className={classes.description}>
            <div className={classes.container}>
                <div className={classes.about}>
                    <div className={classes['event-image']}>
                        <img src={imageUrl} alt="event" />
                    </div>
                    <div>
                        <p>{intro}</p>
                        <p className={classes.stars}>{stars.toFixed(1)} 💖 ({reviews.length})</p>
                    </div>
                </div>
                <div className={classes.desc}>
                    {description}
                </div>
            </div>

        </div>
    )
}

export default EventDescription