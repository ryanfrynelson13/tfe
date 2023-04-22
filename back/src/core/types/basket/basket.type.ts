export type Basket = {
    products: BasketProduct[]
    total: number
}

type BasketProduct = {
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