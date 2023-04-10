import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>
    ){}

    async findAllFavorites(userId: number){
        const {favorites} = await this.userRepo.findOne({where: {id: userId}, relations: {favorites: true}})

        return favorites

    }

    async addToFavorites(userId: number, eventId: number){
        const user = await this.userRepo.findOne({where: {id: userId}, relations: {favorites: true}})
        const event = await this.eventRepo.findOne({where: {id: eventId}})

        if(!user || !event){
            throw new NotFoundException("couldn't find user or event")
        }

        user.favorites.push(event)

        return (await this.userRepo.save(user)).favorites
    }

    async removeFromFavorites(userId: number, eventId: number){
        const user = await this.userRepo.findOne({where: {id: userId}, relations: {favorites: true}})

        if(!user){
            throw new NotFoundException("couldn't find user")
        }

        user.favorites = user.favorites.filter(event => event.id != eventId)

        return (await this.userRepo.save(user)).favorites
    }
}
