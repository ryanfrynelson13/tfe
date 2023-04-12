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

    async findAllEvents(limit: number, page: number, sortBy: string) {
        let allEvents
        if(sortBy == 'date'){
            allEvents = await this.eventRepo.find({
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
                    startDate: true
                },
                take: limit,
                skip: limit * (page-1),
                order: {
                    startDate: 'ASC'
                }
            })
        } else{
            allEvents = allEvents = await this.eventRepo.find({
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
                    startDate: true
                }
            })
            if(sortBy == 'price'){
                for(const event of allEvents){                    
                    let prices: number[] = []
                    for(const ticket of event.tickets){
                        prices.push(ticket.pricePerTicket)
                    }
                    event.lowPrice = Math.min(...prices)                    
                }

                allEvents = allEvents.sort((a, b) => a.lowPrice > b.lowPrice ? 1 : -1)
            } else {
                for(const event of allEvents){
                    event.starsAvg = event.reviews.length >0 ? event.reviews.reduce((total, {stars}) => {
                        return  total + stars
                    }, 0)/ event.reviews.length : 0
                }
                allEvents = allEvents.sort((a, b) => a.starsAvg < b.starsAvg ? 1 : -1)
            }

            allEvents = allEvents.slice(limit *( page -1), limit * page)
        }

        return allEvents
    }

    async findEventsCount() {
        return this.eventRepo.count({})
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
