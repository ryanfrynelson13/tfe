import { useMemo, useState } from "react";
import { DetailledEvent } from "../../../types/events/detailled-event.type";
import classes from './event-description.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons'
import {faHeart} from '@fortawesome/free-regular-svg-icons'

const EventDescription = ({imageUrl, intro, description, reviews}: DetailledEvent) => {

    const [liked, setLiked] = useState(false)

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
                    <div className={classes.side}>
                        <div>
                            {
                                liked ? 
                                <FontAwesomeIcon style={{
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '1.8rem'
                                }} icon={faHeartFull} color="red" border={true} onClick={() => setLiked(liked => !liked)}/>
                                :
                                <FontAwesomeIcon style={{
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '1.8rem'
                                }} icon={faHeart} border={true} onClick={() => setLiked(liked => !liked)}/>
                            }
                        </div>
                        <div className={classes.intro}>
                            <p>{intro}</p>
                            <p className={classes.stars}>{stars.toFixed(1)} <FontAwesomeIcon icon={faStar} color="gold"/> ({reviews.length})</p>
                        </div>
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