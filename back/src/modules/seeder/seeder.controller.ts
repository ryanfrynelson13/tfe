import { Controller, Post } from '@nestjs/common';
import { SeederService } from 'src/core/services/seeder/seeder.service';

@Controller('seeder')
export class SeederController {

    constructor(
        private readonly seederService: SeederService
    ){}

    @Post()
    populate(){
        return this.seederService.populate()
    }
}
