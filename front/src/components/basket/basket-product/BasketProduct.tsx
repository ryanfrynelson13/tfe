import useEvent from "../../../hooks/events/useEvent";
import useSession from "../../../hooks/events/useSession"
import * as dayjs from 'dayjs'
import classes from './basket-product.module.css'
import { BasketProduct as BasketProductProps } from "../../../types/basket/basket.type";
import { useState } from "react";
// import {Tick} from '@mui/icons-material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ticketsPng from '../../../assets/images/tickets.png'

const BasketProduct = ({eventId, tickets, sessionId}: BasketProductProps) => {

    const {event} = useEvent(eventId)
    const {session} = useSession(sessionId)

    const [display, setDisplay] = useState<boolean>(false)
    return(
        <div>
            <div className={classes.title}>
                <p>{event?.title}</p>
                <p>{dayjs(session?.startTime).format('DD/MM/YY HH:mm').toString()}</p>
                <div className={classes.tickets}>
                    <p>{tickets.length}</p>
                    <div>
                     <img src={ticketsPng} alt="" />
                    </div>
                </div>
                <FontAwesomeIcon style={{cursor: 'pointer'}} icon={display? faArrowUp : faArrowDown} onClick={() => setDisplay(display => !display)}/>
            </div>
            {
                display && 
                <div style={{height: '4vh'}}>
                    
                </div>
            }

        </div>
    )
}

export default BasketProduct