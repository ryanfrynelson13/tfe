import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useUserEvents from "../../hooks/users/useUserEvents"
import { useRecoilValue } from "recoil"
import { userAtom } from "../../atoms/user.atom"
import { EventType } from "../../types/events/event.type"
import classes from './my-events.module.css'
import Pagination from "../../components/pagination/Pagination"


const EventCard = ({id, imageUrl, title}: EventType) => {

    const navigate = useNavigate()

    return(
        <div className={classes.card} onClick={() => navigate(`/event/${id}`)}>
            <div className={classes.image}>
                <img src={imageUrl} alt="event" />
            </div>
            <div>
                <p>{title}</p>
            </div>
        </div>
    )
}


const MyEvents = () => {
    const user = useRecoilValue(userAtom)
    const {isLoading, events} = useUserEvents()
    const navigate = useNavigate()

    const [eventsFiltered, setEventsFiltered] = useState<{ended: boolean, event: EventType}[]>([])
    const [page, setPage] = useState<number>(1)
    const [eventsOnPage, setEventsOnPage] = useState<{ended: boolean, event: EventType}[]>(eventsFiltered?.slice(24 *( page -1), 24 * page))
    const [display, setDisplay] = useState<string>('upcoming')

    useEffect(() => {
        if(!user){
            navigate('/auth/login')
        }
    }, [user])

    useEffect(() => {
        if(events){
            if(display === 'upcoming'){
                setEventsFiltered(events.filter(event => !event.ended))
            } else {
                setEventsFiltered(events.filter(event => event.ended))
            }
        }
    },[events, display])

    useEffect(() => {
        setEventsOnPage(eventsFiltered?.slice(24 *( page -1), 24 * page))
    }, [page, eventsFiltered, display])

    const changePage = (page: number) => {
        setPage(page)
    }

    const eventsMap =  eventsOnPage?.map((event) => (
        <EventCard {...event.event} key={event.event.id}/>
    ))
    return(
        <div className={classes.events}>
            <div className={classes.filters}>
                <button onClick={() => setDisplay('upcoming')} className={display === 'upcoming' ? classes.active: ''}>Upcoming Events</button>
                <button onClick={() => setDisplay('past')} className={display === 'past' ? classes.active: ''}>Past Events</button>
            </div>
            <div className={classes.grid}>
                {eventsMap}
            </div>  
            {eventsFiltered?.length > 1 && <Pagination onPage={changePage} count={eventsFiltered?.length}/>}  
        </div>
    )
}

export default MyEvents

