import { useMemo } from 'react'
import { EventType } from '../../../types/events/event.type'
import classes from './event-card.module.css'
import { useNavigate } from 'react-router-dom'

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
        <div className={classes.card} onClick={() => navigate(`event/${id}`)}>
            <div className={classes.image}>
                <img src={imageUrl} alt="event" />
            </div>
            <div>
                <p>{title}</p>
                <p>apd de {price}€</p>
                <p>{stars > 0 ? stars.toFixed(1) + '💖' : ''}</p>
            </div>
        </div>
    )
}

export default EventCard