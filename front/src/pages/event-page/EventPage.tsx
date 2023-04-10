import { useParams } from "react-router-dom"
import Banner from "../../components/banner/Banner"
import EventInfo from "../../containers/events/event-info/EventInfo"
import useEvent from "../../hooks/events/useEvent"


const EventPage = () => {
    const {id} = useParams()
    const {event, isLoading, error} = useEvent(id!)
    return isLoading ?
    (
        <>
            ...Loading
        </>
    ): event? 
    (
        <>
           <Banner imageUrl={''} title={event?.title ?? ''}/>
           <EventInfo event={event}/>           
        </>
    ) : (
        <>
            
        </>
    )
}

export default EventPage