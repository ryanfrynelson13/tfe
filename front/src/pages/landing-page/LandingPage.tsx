import { useEffect } from "react"
import Banner from "../../components/banner/Banner"
import EventsGrid from "../../containers/events/events-grid/EventsGrid"
import { useResetRecoilState, useSetRecoilState } from "recoil"
import { filtersAtom } from "../../atoms/filters.atom"
import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"


const LandingPage = () => {

    const resetFilters = useResetRecoilState(filtersAtom) 
    const setFilters = useSetRecoilState(filtersAtom)

    useEffect(() => {
        resetFilters()
        axios.get<[number, number]>(EVENT_URLS.priceRange)
        .then(({data}) => setFilters(filters => ({...filters, priceRange: data})))
    })
    return (
        <>
            <Banner imageUrl="https://images.unsplash.com/photo-1678885407096-e8cbc7bc1e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80" title="EventScene"/>
            <div style={{
                // position: 'relative'
            }}>
                <h2>Find Events Near You</h2>
                <EventsGrid />
            </div>
        </>
    )
}

export default LandingPage