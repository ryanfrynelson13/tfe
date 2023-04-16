import { useEffect, useState } from "react"
import Session from "../../components/session/Session"
import { Session as SessionType} from "../../types/sessions/session.type"
import { TicketPrice } from "../../types/ticket-prices/ticket-price.type"
import classes from './date-sessions.module.css'

type DateSessionsProps = {
    sessions: SessionType[]
    tickets: TicketPrice[]

}


const DateSessions = ({sessions, tickets}: DateSessionsProps) =>{

    const [displayTickets, setDisplayTickets] = useState<{ id: number, display: boolean}[]>([])

    useEffect(() => {
        setDisplayTickets(sessions.map((session, index) =>( {id: session.id, display: index === 0 ? true : false})))
    }, [sessions])

    const handleChangeDisplay = (id: number) => {
        setDisplayTickets(displayTickets.map(display => display.id === id ? {...display, display: !display.display} : {...display, display: false}))
    }

    const sessionsMap = sessions?.map(session => (
        <Session key={session.id} {...session} tickets={tickets} display={displayTickets.find(display => display.id === session.id)!} onDisplay={handleChangeDisplay}/>
    ))

    return sessions.length > 0 ?(
        <div className={classes.available}>
            <h3>Available Tickets</h3>
            <div className={classes.sessions}>
                {sessionsMap}            
            </div>
        </div>
    ) :
    (
        <div>
            <h3>No tickets available for this date</h3>
        </div>
    )
} 

export default DateSessions