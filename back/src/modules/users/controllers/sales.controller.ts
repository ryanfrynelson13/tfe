import { Controller,Request, Patch, Body, Get, Param, UseGuards, Post, Delete } from '@nestjs/common';
import { SalesService } from 'src/core/services/sales/sales.service';


// @UseGuards(AuthGard)
@Controller('users/sales')
export class SalesController {

    constructor(
        private readonly salesService: SalesService
    ){}
    
    @Patch()
    update(){
        return this.salesService.updateSale()
    }

}