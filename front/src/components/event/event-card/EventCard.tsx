import { useMemo } from 'react'
import { EventType } from '../../../types/events/event.type'
import classes from './event-card.module.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const EventCard = ({id, imageUrl, title, reviews, tickets}: EventType) => {

    const navigate = useNavigate()

    const price = useMemo(() => {
        let prices: number[] = []
        for(const ticket of tickets){
            prices.push(ticket.pricePerTicket)
        }
        return Math.min(...prices)
    },[tickets])

    const stars = useMemo(() => {
        return reviews.length >0 ? reviews.reduce((total, {stars}) => {
           return  total + stars
        }, 0)/ reviews.length : 0
    },[reviews])

    return(
        <div className={classes.card} onClick={() => navigate(`/event/${id}`)}>
            <div className={classes.image}>
                <img src={imageUrl} alt="event" />
            </div>
            <div>
                <p>{title}</p>
                <p>apd de {price}€</p>
                { stars > 0 && <p>{stars.toFixed(1)} <FontAwesomeIcon icon={faStar} color="gold"/></p>}
            </div>
        </div>
    )
}

export default EventCard