import Banner from "../../components/banner/Banner"
import EventsGrid from "../../containers/events/events-grid/EventsGrid"
import useEvents from "../../hooks/events/useEvents"


const LandingPage = () => {

    const {isLoading, events, error} = useEvents('24')

    return (
        <>
            <Banner imageUrl="https://images.unsplash.com/photo-1678885407096-e8cbc7bc1e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80" title="EventScene"/>
            <h2>Find Events Near You</h2>
            <EventsGrid isLoading={isLoading} events={events} error={error}/>
        </>
    )
}

export default LandingPage