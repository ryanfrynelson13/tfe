import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { LocationType } from 'src/core/types/locations/location.type';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(EventLocationEntity) private locationsRepo: Repository<EventLocationEntity>,
    ){}

    async createLocation(userId: number, location:LocationType){
        const user = await this.userRepo.findOneBy({id: userId})

        const newLocation = await this.locationsRepo.create(location)

        newLocation.user = user

        return this.locationsRepo.save(newLocation)
    }
}
