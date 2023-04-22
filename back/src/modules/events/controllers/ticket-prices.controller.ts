import { Controller, Get } from "@nestjs/common";
import { TicketPricesService } from "src/core/services/ticket-prices/ticket-prices.service";


@Controller('ticket-prices')
export class ticketPricescontroller{

    constructor(
        private readonly ticketPricesService: TicketPricesService
    ){}
    
    @Get('range')
    getHighestAndLowest(){
        return this.ticketPricesService.getHighestAndLowest()
    }
}