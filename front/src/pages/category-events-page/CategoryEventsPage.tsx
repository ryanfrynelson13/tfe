import { useParams } from "react-router-dom"
import { useCategory } from "../../hooks/events/useCategory"
import Banner from "../../components/banner/Banner"
import EventsGrid from "../../containers/events/events-grid/EventsGrid"
import { useRecoilState, useSetRecoilState } from "recoil"
import { filtersAtom } from "../../atoms/filters.atom"
import { useEffect } from "react"


const CategoryEventsPage = () => {
    const {id} = useParams()

    const setFilters = useSetRecoilState(filtersAtom)

    useEffect(() => {
        setFilters(filters => ({...filters, categories: id? [+id]: []}))
    }, [id])
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
            <EventsGrid />
        </>
    ) : (
        <>
            
        </>
    )
}

export default CategoryEventsPage