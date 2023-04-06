import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateEventDto } from 'src/core/dtos/events/update-event.dto';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { CategoryEntity } from 'src/core/models/entities/category.entity';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { NewEventType } from 'src/core/types/events/new-event.type';
import { Like, MoreThan, Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(EventLocationEntity) private locationRepo: Repository<EventLocationEntity>,
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

    async findSearchedEvents(q: string, limit: number) {
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
            take: limit
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
        const newEvent: EventEntity = await this.eventRepo.create(event.event)

        const category = await this.categoryRepo.findOne({where:{id: event.categoryId}})
        const location= await this.locationRepo.findOne({where:{id: event.locationId}})

        newEvent.category = category
        newEvent.location = location

        return this.eventRepo.save(newEvent)
    }

    async updateEvent(attrs: Partial<EventEntity>, eventId: number){
        const eventToUpdate = await this.eventRepo.findOneBy({id: eventId})
        Object.assign(eventToUpdate, attrs)
        return this.eventRepo.save(eventToUpdate)
    }
}
