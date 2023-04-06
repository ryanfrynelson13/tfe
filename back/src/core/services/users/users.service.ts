import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
        @InjectRepository(EventEntity) private eventsRepo: Repository<EventEntity>
    ){}

    async findAllFavorites(userId: number){
        const {favorites} = await this.usersRepo.findOne({where: {id: userId}, relations: {favorites: true}})

        return favorites

    }

    async addToFavorites(userId: number, eventId: number){
        const user = await this.usersRepo.findOne({where: {id: userId}, relations: {favorites: true}})
        const event = await this.eventsRepo.findOne({where: {id: eventId}})

        if(!user || !event){
            throw new NotFoundException("couldn't find user or event")
        }

        user.favorites.push(event)

        return this.usersRepo.save(user)
    }
}
