import { Body, Controller, Patch, Request, UseGuards} from '@nestjs/common';
import { BasketDto } from 'src/core/dtos/sales/basket.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { SalesService } from 'src/core/services/sales/sales.service';
import { TicketsService } from 'src/core/services/tickets/tickets.service';

@Controller('sales')
export class SalesController {

    constructor(
        private readonly ticketsService: TicketsService,
        private readonly salesService: SalesService
    ){}

    @UseGuards(AuthGard)
    @Patch()
    checkOutBasket(
        @Request() req,
        @Body() basket: BasketDto
    ){
        const user = req.user
        return this.salesService.createSale(user.id, basket)
    }
}
