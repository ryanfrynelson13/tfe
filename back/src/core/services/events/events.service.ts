import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/event.entity';
import { CategoryEntity } from 'src/core/models/entities/category.entity';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { EventType } from 'src/core/types/events/event.type';
import { FiltersType } from 'src/core/types/events/filters.type';
import { NewEventType } from 'src/core/types/events/new-event.type';
import {filterEvents } from 'src/core/utils/events.util';
import { sortDates } from 'src/core/utils/sessions.utils';
import { ILike, MoreThan, Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(EventLocationEntity) private locationRepo: Repository<EventLocationEntity>,
    ){}

    async findAllEvents(limit: number, page: number, sortBy: string, filters: FiltersType) {
        let allEvents: EventType[]
        const {categories, priceRange, lowestStars} = filters
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
        allEvents = filterEvents(allEvents, categories, priceRange, lowestStars)        
        

        if(sortBy == 'price'){
            allEvents = allEvents.sort((a, b) => a.lowestPrice > b.lowestPrice ? 1 : -1)
        } 
        if(sortBy == 'stars') {
            allEvents = allEvents.sort((a, b) => a.avgStars < b.avgStars ? 1 : -1)
        }
        allEvents = allEvents.slice(limit *( page -1), limit * page)

        return allEvents
    }

    async findEventsCount( filters: FiltersType) {
        const {categories, priceRange, lowestStars} = filters
        let events: EventType[]  = await this.eventRepo.find({ where: {
            endDate: MoreThan(new Date().toISOString())                
        },relations:{
            tickets: true,
            reviews: true,
            category: true
        }})

        events = filterEvents(events, categories, priceRange, lowestStars)

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
                'reviews.user',
                'sessions',
                'tickets'
            ]
        })

        if(!event){
            throw new NotFoundException('event not found')
        }

        event.sessions = sortDates(event.sessions)

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
