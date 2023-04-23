export type Basket = {
    products: BasketProduct[]
    checkOutTotal: number
    total: number
}

type BasketProduct = {
    eventId: number
    checkOut: boolean
    sessionId: number
    tickets:  BasketTicket[]
}

type BasketTicket = {
    id: number
    title: string
    pricePerTicket: number
    nbPlaces: number
    nb: number
}