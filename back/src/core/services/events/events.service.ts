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
import { SalesService } from '../sales/sales.service';
import { UsersService } from '../users/users.service';
import { SessionEntity } from 'src/core/models/entities/sessions.entity';
import * as dayjs from 'dayjs'
// import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
// import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
// dayjs.extend(isSameOrBefore)
// dayjs.extend(isSameOrAfter)

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(EventLocationEntity) private locationRepo: Repository<EventLocationEntity>,
        private readonly salesService: SalesService,
        private readonly usersService: UsersService
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


    async createEvent(userId: number, event: NewEventType) {

        const newEvent: EventEntity = await this.eventRepo.create(event.event)
        
        const user = await this.usersService.getOneUser(userId)
        const category = await this.categoryRepo.findOne({where:{id: event.categoryId}})
        const location= await this.locationRepo.findOne({where:{id: event.locationId}})

        newEvent.category = category
        newEvent.location = location
        newEvent.user = user

        return this.eventRepo.save(newEvent)
    }

    async updateEvent(attrs: Partial<EventEntity>, eventId: number){    
        const eventToUpdate = await this.eventRepo.findOneBy({id: eventId})
        Object.assign(eventToUpdate, attrs)
        return this.eventRepo.save(eventToUpdate)
    }

    async getUserEvents(userId: number) {

        const usersSales = await this.salesService.getUsersSales(userId)

        const allSessions: SessionEntity[] = []
        
        for(const sale of usersSales){
            for(const ticket of sale.tickets){
                const sameEvent = allSessions.find(session => session.event.id === ticket.session.event.id)
                if(sameEvent){
                    if((dayjs(sameEvent.startTime).isAfter(dayjs()) && dayjs(ticket.session.startTime).isBefore(dayjs()) || (dayjs(sameEvent.startTime).isBefore(dayjs()) && dayjs(ticket.session.startTime).isAfter(dayjs()))) && allSessions.filter(session => session.event.id === ticket.session.event.id).length < 2){
                        allSessions.push(ticket.session)
                    }
                }else {
                    allSessions.push(ticket.session)
                }
            }
        }

        const events: {ended: boolean, event: EventEntity}[] = []

        for(const session of allSessions){
            const event = {
                event: session.event,
                ended: dayjs(session.startTime).isBefore(dayjs()) ? true : false 
            }

            events.push(event)
        }

        return events
    }
}
