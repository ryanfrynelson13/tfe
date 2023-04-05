import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventsService } from '../../../core/services/events/events.service';
import { CreateEventDto } from 'src/core/dtos/events/create-event.dto';

@Controller('events')
export class EventsController {

    constructor(
        private readonly eventsService: EventsService
    ){}

    @Get()
    async getAllEvents(
        @Query('limit') limit: number
    ){
        const allEvents = await this.eventsService.findAllEvents(limit)

        return allEvents
    }

    @Get('search')
    async getSearchedEvents(
        @Query('q') q: string,
        @Query('limit') limit: number
    ){
        const searchedEvents = await this.eventsService.findSearchedEvents(q, limit)
        return searchedEvents
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
