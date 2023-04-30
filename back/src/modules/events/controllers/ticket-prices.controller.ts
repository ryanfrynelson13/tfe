import { Body, Controller, Get, Post } from "@nestjs/common";
import { TicketPricesService } from "src/core/services/ticket-prices/ticket-prices.service";
import { NewTicketPriceType } from "src/core/types/tickets/new-ticket-price.type";


@Controller('ticket-prices')
export class ticketPricescontroller{

    constructor(
        private readonly ticketPricesService: TicketPricesService
    ){}
    
    @Get('range')
    getHighestAndLowest(){
        return this.ticketPricesService.getHighestAndLowest()
    }

    @Post()
    createTicket(
        @Body() newTicket: NewTicketPriceType
    ){
        return this.ticketPricesService.createTicket(newTicket)
    }
}