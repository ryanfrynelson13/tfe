import { Controller, Get, UseGuards, Request, Post, Body} from '@nestjs/common';
import { AddressDto } from 'src/core/dtos/addresses/address.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { AddressesService } from 'src/core/services/addresses/addresses.service';

@Controller('users/addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService
    ){}
    
    @Get('countries')
    getCountries(){
        return this.addressesService.getCountries()
    }

    @UseGuards(AuthGard)
    @Post()
    create(
        @Request() req,
        @Body() address: AddressDto
    ){
        const user = req.user
        return this.addressesService.create(user.id, address)
    }

}