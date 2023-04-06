import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DetailledEvent } from "../../types/events/detailled-event.type"
import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"
import Banner from "../../components/banner/Banner"
import EventInfo from "../../containers/events/event-info/EventInfo"


const EventPage = () => {
    const {id} = useParams()
    const [event, setEvent] = useState<DetailledEvent | null>(null)
    useEffect(() => {
        if(id){
            axios.get<DetailledEvent>(EVENT_URLS.events + id)
                .then(({data}) => {
                    setEvent(data)
                })
                .catch(err => console.log(err))
        }
    },[id])
    return event? (
        <>
           <Banner imageUrl={''} title={event.title}/>
           <EventInfo event={event}/>

        </>
    ): (
        <>
            ...Loading
        </>
    )
}

export default EventPage