import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { NewEventType } from 'src/core/types/events/new-event.type';
import { Like, MoreThan, Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>
    ){}

    async findAllEvents(limit: number) {
        const allEvents = await this.eventRepo.find({
            where: {
                endDate: MoreThan(new Date().toISOString())
            },
            relations:{
                tickets: true,
                reviews: true
            },
            select:{
                id:true,
                title:true,
                imageUrl:true,
            },
            take: limit
        })

        return allEvents
    }

    async findSearchedEvents(q: string) {
        const allEvents = await this.eventRepo.find({
            where: {
                endDate: MoreThan(new Date().toISOString()),
                title: Like(`%${q}%`)
            },
            relations:{
                tickets: true,
                reviews: true
            },
            select:{
                id:true,
                title:true,
                imageUrl:true,
            },
            take: 20
        })

        return allEvents
    }

    async findOneEvent(id: number) {
        const event = await this.eventRepo.findOne({
            where: {id: id},
            relations:{
                location: true,
                category: true,
                reviews: true
            }
        })

        if(!event){
            throw new NotFoundException('event not found')
        }

        return event
    }


    async createEvent(event: NewEventType) {
        const newEvent = await this.eventRepo.create(event.event)

        const savedEvent = await this.eventRepo.save(newEvent)

        return savedEvent
    }
}
