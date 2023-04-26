import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import { BasketDto } from 'src/core/dtos/sales/basket.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { SalesService } from 'src/core/services/sales/sales.service';
import { TicketsService } from 'src/core/services/tickets/tickets.service';

@UseGuards(AuthGard)
@Controller('sales')
export class SalesController {

    constructor(
        private readonly ticketsService: TicketsService,
        private readonly salesService: SalesService
    ){}

   
    @Post()
    checkOutBasket(
        @Request() req,
        @Body() basket: BasketDto
    ){
        const user = req.user
        return this.salesService.createSale(user.id, basket)
    }

    @Get('tickets/:id')
    getTickets(
        @Param('id') id: number
    ){
        return this.ticketsService.getTickets(id)
    }

    @Get('promise')
    getStripePk(){
        return this.salesService.getPublicKey()
    }

    @Post('secret')
    createStripeIntent(
        @Body() body: any
    ){
        return this.salesService.createStripeSale(body.amount)
    }

    @Get('user')
    getUserSales(
        @Request() req
    ){
        const user = req.user
        return this.salesService.getUsersSales(user.id)
    }

}
