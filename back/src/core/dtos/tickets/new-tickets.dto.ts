import { Type } from "class-transformer"
import { IsInt, IsNumber, IsString, ValidateNested } from "class-validator"


export class TicketPriceDto {
    @IsString()
    title: string

    @IsInt()
    nbPlaces: number

    @IsNumber()
    pricePerTicket: number
}


class NewTicketPriceDto  {
    
    @ValidateNested()
    @Type(() => TicketPriceDto)
    ticket: TicketPriceDto

    @IsInt()
    eventId: number
}