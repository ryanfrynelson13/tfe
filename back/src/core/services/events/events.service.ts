import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateEventDto } from 'src/core/dtos/events/update-event.dto';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { CategoryEntity } from 'src/core/models/entities/category.entity';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { EventType } from 'src/core/types/events/event.type';
import { NewEventType } from 'src/core/types/events/new-event.type';
import { addAvgStars, addLowestPrice, filterEvents } from 'src/core/utils/events.util';
import { ILike, Like, MoreThan, Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(EventLocationEntity) private locationRepo: Repository<EventLocationEntity>,
    ){}

    async findAllEvents(limit: number, page: number, sortBy: string) {
        let allEvents: EventType[]
      
        allEvents = await this.eventRepo.find({
            where: {
                endDate: MoreThan(new Date().toISOString())               
            },
            relations:{
                tickets: true,
                reviews: true,
                category: true
            },
            select:{
                id:true,
                title:true,
                imageUrl:true,
                startDate: true
            },
            order: sortBy == 'date' ?{
                startDate: 'ASC'
            } : {}
        })
        allEvents = filterEvents(allEvents, [1, 2, 4, 5, 6], [15, 100.20], 1.5)        
        

        if(sortBy == 'price'){
            allEvents = allEvents.sort((a, b) => a.lowestPrice > b.lowestPrice ? 1 : -1)
        } 
        if(sortBy == 'stars') {
            allEvents = allEvents.sort((a, b) => a.avgStars < b.avgStars ? 1 : -1)
        }
        allEvents = allEvents.slice(limit *( page -1), limit * page)

        return allEvents
    }

    async findEventsCount() {
        let events: EventType[]  = await this.eventRepo.find({ where: {
            endDate: MoreThan(new Date().toISOString())                
        }})

        events = filterEvents(events, [1, 2, 4, 5, 6], [15, 100.20], 1.5)

        return events.length
    }

    async findSearchedEvents(q: string, limit: number) {
        const allEvents = await this.eventRepo.find({
            where: {
                endDate: MoreThan(new Date().toISOString()),
                title: ILike(`%${q}%`)
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
            take: limit,
        })

        return allEvents
    }

    async findOneEvent(id: number) {
        const event = await this.eventRepo.findOne({
            where: {id: id},
            relations:[
                'location',
                'category',
                'reviews.user'
            ]
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
