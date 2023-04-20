import * as dayjs from "dayjs";
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { EventEntity } from "../models/entities/event.entity";
import { SessionEntity } from "../models/entities/sessions.entity";
dayjs.extend(isSameOrBefore)

export const createSessionsDates = (event: EventEntity, openDays: number[], startTime: string[], closeTime: string[] ) => {

    const startDate = dayjs(event.startDate, 'YYYY-MM-DD').set('hour', +startTime[0]).set('minute', +startTime[1])
    const endDate = dayjs(event.endDate, 'YYYY-MM-DD').set('hour', +closeTime[0]).set('minute', +closeTime[1])
    let sessionDate = startDate.clone()
    const allDates: string[] = []
    
    while(sessionDate.isSameOrBefore(endDate)){
        if(openDays.some(day => day === sessionDate.day())){
            const lastSession = sessionDate.clone().set('hour', +closeTime[0]).set('minute', +closeTime[1]).subtract(event.duration, 'minute')
            while(sessionDate.isSameOrBefore(lastSession)){
                allDates.push(sessionDate.toISOString())
                sessionDate = sessionDate.add(event.duration, 'minute')
            }
        }
        sessionDate = sessionDate.set('hour', +startTime[0]).set('minute', +startTime[1]).add(1, 'day')     
    }
    
    return allDates
}


export const sortDates = (sessions: SessionEntity[]) => {

    let sortedSessions = sessions.filter(session => !dayjs(session.startTime).isSameOrBefore(dayjs()))

    sortedSessions = sortedSessions.sort((a, b) => dayjs(a.startTime).isSameOrBefore(dayjs(b.startTime))? -1 : 1)

    return sortedSessions
}