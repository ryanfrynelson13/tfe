import {Body, Controller,Post, Request, UseGuards} from '@nestjs/common'
import { LocationDto } from 'src/core/dtos/locations/location.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { LocationsService } from 'src/core/services/locations/locations.service';

@UseGuards(AuthGard)
@Controller('locations')
export class LocationsController{

    constructor(
        private readonly locationsService: LocationsService
    ){}

    @Post()
    createLocation(
        @Request() req,
        @Body() location: LocationDto
    ){
        const user = req.user
        return this.locationsService.createLocation(user.id, location) 
    }
}