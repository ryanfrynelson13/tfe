import { Controller, Get } from "@nestjs/common";
import { TicketsService } from "src/core/services/tickets/tickets.service";


@Controller('tickets')
export class ticketscontroller{

    constructor(
        private readonly ticketsService: TicketsService
    ){}
    
    @Get('range')
    getHighestAndLowest(){
        return this.ticketsService.getHighestAndLowest()
    }
}