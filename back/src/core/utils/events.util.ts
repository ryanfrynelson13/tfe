import { EventType } from "../types/events/event.type"

export const addLowestPrice = (event: EventType) => {               
    let prices: number[] = []
    console.log(event)
    for(const ticket of event.tickets){
        prices.push(ticket.pricePerTicket)
    }
    event.lowestPrice = Math.min(...prices)    

    return event
}

export const addAvgStars = (event: EventType) => {
    event.avgStars = event.reviews.length >0 ? event.reviews.reduce((total, {stars}) => {
        return  total + stars
    }, 0)/ event.reviews.length : 0

    return event
}

export const filterEvents = (events: EventType[], categories: number[], priceRange: [number, number], lowestStars: number) => {
    for(let event of events){
        event = addLowestPrice(event)
        event = addAvgStars(event)        
    }

    events = events.filter(event => categories.some(category => category === event.category.id) && event.lowestPrice >= priceRange[0] && event.lowestPrice <= priceRange[1] && event.avgStars >= lowestStars? true: false)

    return events
}