import { Controller, Get} from '@nestjs/common';
import { AddressesService } from 'src/core/services/addresses/addresses.service';

@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService
    ){}
    
    @Get('countries')
    getCountries(){
        return this.addressesService.getCountries()
    }
}