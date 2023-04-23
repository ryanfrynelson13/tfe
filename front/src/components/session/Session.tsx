import { useState } from "react"
import { Session as SessionType } from "../../types/sessions/session.type"
import { TicketPrice } from "../../types/ticket-prices/ticket-price.type"
import classes from './session.module.css'
import * as dayjs from 'dayjs'
import Ticket from "../ticket/Ticket"
import { useRecoilState } from "recoil"
import { basketAtom } from "../../atoms/basket.atom"

type SessionProps = SessionType & {
    eventId: number
    tickets: TicketPrice[]
    display: {id: number, display: boolean}
    onDisplay: (id: number) => void
}

const Session = ({id, startTime, tickets, display, onDisplay, eventId}: SessionProps) => {

    const [basket, setBasket] = useRecoilState(basketAtom)

    const [ticketsToAdd, setTicketsToAdd] = useState(tickets.map(ticket => ({...ticket, nb: 0})) )
    const [priceToAdd, setPriceToAdd] = useState<number>(0)

    const handleNumberChange = (id: number, step: number, price: number) => {
        setTicketsToAdd(ticketsToAdd.map(ticket => ticket.id === id? {...ticket, nb:ticket.nb + step} : ticket))
        setPriceToAdd(oldPrice => oldPrice += price * step)
    }

    const addToCart = () => {
        let elementsToAdd = ticketsToAdd.filter(ticket => ticket.nb > 0)

        let basketProduct = {
            eventId: eventId,
            sessionId: id,
            checkOut: true,
            tickets: elementsToAdd
        }

        const checkAlreadyInBasket = basket.products.find(product => product.sessionId === id)

        if(checkAlreadyInBasket){
            for(const ticket of checkAlreadyInBasket.tickets){
                let newTicket = basketProduct.tickets.find(newticket => ticket.id === newticket.id)
                if(newTicket){
                    const updatedTicket = {
                        ...newTicket,
                        nb: newTicket.nb + ticket.nb
                    }
                    const index = basketProduct.tickets.findIndex(newticket => ticket.id === newticket.id)
                    basketProduct.tickets[index] = updatedTicket               
                } else{
                    basketProduct.tickets.push(ticket)
                }
            }
            console.log(basketProduct.tickets)
            setBasket({products: basket.products.map(product => product.sessionId === id ? basketProduct : product), total: basket.total+ priceToAdd, checkOutTotal: +basket.checkOutTotal.toFixed(2) + +priceToAdd.toFixed(2)* 100})
        }else{
            setBasket({products: [...basket.products, basketProduct], total: basket.total+ priceToAdd,checkOutTotal: +basket.checkOutTotal.toFixed(2) + +priceToAdd.toFixed(2)* 100})
        }

        setTicketsToAdd(tickets.map(ticket => ({...ticket, nb: 0})))
        setPriceToAdd(0)
    }
    
    const ticketsMap = ticketsToAdd?.map(ticket => (
        <Ticket key={ticket.id} {...ticket} onNumberChange={handleNumberChange}/>
    ))

    return(
        <div className={classes.session}>
            <div className={classes.time} onClick={() => onDisplay(id)}>
                <p>                    
                    {dayjs(startTime).hour()}H{dayjs(startTime).minute() < 10  && '0'}{dayjs(startTime).minute()}
                </p>
            </div>
            {
                display?.display && 
                <div className={classes.tickets}>
                    {ticketsMap}
                    <div className={classes['add-to-cart']}>
                        <button onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Session