import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/shared/entities/Event.entity';
import { EventType } from 'src/shared/types/events/event.type';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>
    ){}

    async findAllEvents() {
        const allEvents = await this.eventRepo.find()

        return allEvents
    }

    async createEvent(event: EventType) {
        const newEvent = await this.eventRepo.create(event)

        const savedEvent = await this.eventRepo.save(newEvent)

        return savedEvent
    }
}
