import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from '../../../core/services/events/events.service';
import { CreateEventDto } from 'src/core/dtos/events/create-event.dto';

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

    @Get(':id')
    getOneEvents(
        @Param('id') id: number
    ){
        return this.eventsService.findOneEvent(id)
    }

    @Post()
    async createEvent(
        @Body() event: CreateEventDto
    ){
        const createdEvent = await this.eventsService.createEvent(event)

        return createdEvent
    }
}
