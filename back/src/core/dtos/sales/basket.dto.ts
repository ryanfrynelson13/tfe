import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";


export class BasketDto {

    @IsArray()
    products: BasketProduct[]

    @IsNumber()
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