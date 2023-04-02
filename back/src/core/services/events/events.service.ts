import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { NewEventType } from 'src/core/types/events/new-event.type';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>
    ){}

    async findAllEvents() {
        const allEvents = await this.eventRepo.find({
            relations:{
                location: true,
                category: true,
                reviews: true
            }
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
