import {Calendar} from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import * as dayjs from 'dayjs'
import * as dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)
import { useState } from "react"
import { Session } from "../../types/sessions/session.type"
import './calendar.css'

type CalendarProps = {
    sessions: Session[]
    date: any
    onDate: (date: any) => void
}

const CalendarTickets = ({sessions, date, onDate}: CalendarProps) => {




    return(
        <div className='container'>
            <Calendar
                value={date}
                onChange={(value) => onDate(value)}
                minDate={new Date()}
                maxDetail="month"
                minDetail="month"
                maxDate={new Date(sessions[sessions.length -1]?.startTime)}
                className='calendar'
                tileClassName={(props) => {
                    return sessions.some(session => dayjs(props.date).dayOfYear() === dayjs(session.startTime).dayOfYear() && dayjs(props.date).year() === dayjs(session.startTime).year() && session.placesLeft > 0) ? 'events' : ''
                }}
                tileDisabled={(props) => {
                    return sessions.some(session => dayjs(props.date).dayOfYear() === dayjs(session.startTime).dayOfYear() && dayjs(props.date).year() === dayjs(session.startTime).year() && session.placesLeft > 0) ? false : true
                }}
            />
        </div>
    )
}

export default CalendarTickets