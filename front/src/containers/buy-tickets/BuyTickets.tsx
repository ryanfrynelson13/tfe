import { useEffect, useId, useState } from "react"
import CalendarTickets from "../../components/calendar/Calendar"
import { Session } from "../../types/sessions/session.type"
import * as dayjs from "dayjs"
import DateSessions from "../date-sessions/DateSessions"
import { TicketPrice } from "../../types/ticket-prices/ticket-price.type"
import classes from './buy-tickets.module.css'

type BuyTicketsProps = {
    sessions: Session[]
    tickets: TicketPrice[]
}

const BuyTickets = ({sessions, tickets}: BuyTicketsProps) => {

    const id = useId()

    const [date, setDate] = useState<any>(new Date())
    const [dateSessions, setDateSession] = useState<Session[]>([]) 

    useEffect(() => {
        setDateSession(sessions.filter(session => dayjs(date).dayOfYear() === dayjs(session.startTime).dayOfYear() && dayjs(date).year() === dayjs(session.startTime).year() && session.placesLeft > 0))
    },[date])

    const handleChangeDate = (date: any) => {
        setDate(date)
    } 

    return(
        <div className={classes.tickets}>
            <CalendarTickets sessions={sessions} date={date} onDate={handleChangeDate}/>
            <DateSessions key={id} sessions={dateSessions} tickets={tickets}/>
        </div>
    )
}

export default BuyTickets