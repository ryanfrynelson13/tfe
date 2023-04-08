import { useParams } from "react-router-dom"
import { useCategory } from "../../hooks/events/useCategory"
import Banner from "../../components/banner/Banner"
import EventsGrid from "../../containers/events/events-grid/EventsGrid"


const CategoryEventsPage = () => {
    const {id} = useParams()
    const {category, isLoading, error} = useCategory(id!)
    return isLoading ?
    (
        <>
            ...Loading
        </>
    ): category? 
    (
        <>
           <Banner imageUrl={category?.imageUrl} title={category.category ?? ''}/>
           <br />
           <br />
            <EventsGrid isLoading={isLoading} events={category.events} error={error} />
        </>
    ) : (
        <>
            
        </>
    )
}

export default CategoryEventsPage