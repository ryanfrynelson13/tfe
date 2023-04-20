import useEvent from "../../../hooks/events/useEvent";
import useSession from "../../../hooks/events/useSession"
import * as dayjs from 'dayjs'
import classes from './basket-product.module.css'
import { BasketProduct as BasketProductProps } from "../../../types/basket/basket.type";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ticketsPng from '../../../assets/images/tickets.png'
import Ticket from "../../ticket/Ticket";
import { useSetRecoilState } from "recoil";
import { basketAtom } from "../../../atoms/basket.atom";
import { useNavigate } from "react-router-dom";

const BasketProduct = ({eventId, tickets, sessionId}: BasketProductProps) => {

    const navigate = useNavigate()

    const setBasket = useSetRecoilState(basketAtom)

    const {event} = useEvent(eventId)
    const {session} = useSession(sessionId)

    const [display, setDisplay] = useState<boolean>(false)
    const [price, setPrice] = useState<number>(0)
    const [nbTickets, setNbTickets] = useState<number>(0)

    useEffect(() => {
        setPrice(tickets.reduce((total, {pricePerTicket, nb}) => {
            return  total + pricePerTicket * nb
        }, 0))
        setNbTickets(tickets.reduce((total, {nb}) => {
            return  total + nb
        }, 0)    )
    }, [tickets])

    
    const handleNumberChange = (id: number, step: number, price: number) => {
        setBasket(basket => ({products: basket.products.map(product => product.sessionId === sessionId ? {...product, tickets: product.tickets.map(ticket => ticket.id === id? {...ticket, nb: ticket.nb + step}: ticket)} : product), total: basket.total + price * step}))
    }

    const ticketsMap = tickets?.map(ticket => (
        <Ticket key={ticket.id} {...ticket} onNumberChange={handleNumberChange}/>
    ))

    return(
        <div style={{
            marginBottom : '4px'
        }}>
            <div className={classes.title}>
                <p style={{cursor: 'pointer'}} onClick={() => navigate(`/event/${event?.id}`)}>{event?.title}</p>
                <p>{dayjs(session?.startTime).format('DD/MM/YY HH:mm').toString()}</p>
                <div className={classes.tickets}>
                    <p>{nbTickets}</p>
                    <div>
                     <img src={ticketsPng} alt="" />
                    </div>
                </div>
                <p>{price.toFixed(2)}€</p>
                <FontAwesomeIcon style={{cursor: 'pointer'}} icon={display? faArrowUp : faArrowDown} onClick={() => setDisplay(display => !display)}/>
            </div>
            {
                display && 
                <div>
                    {ticketsMap}
                </div>
            }
        </div>
    )
}

export default BasketProduct