import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from 'src/shared/dtos/events/create-event.dto';
import * as events from '../../data/events.json'

@Controller('events')
export class EventsController {

    constructor(
        private readonly eventsService: EventsService
    ){}

    @Get()
    async getAllEvents(){
        const allEvents = await this.eventsService.findAllEvents()

        return allEvents
    }

    @Post()
    async createEvent(
        @Body() event: CreateEventDto
    ){
        for(let i = 2; i< 52; i++){
            await this.eventsService.createEvent(events[i])
        }
        const createdEvent = await this.eventsService.createEvent(event)

        return createdEvent
    }
}
