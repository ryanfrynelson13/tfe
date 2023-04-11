import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EventsService } from '../../../core/services/events/events.service';
import { CreateEventDto } from 'src/core/dtos/events/create-event.dto';
import { updateEventDto } from 'src/core/dtos/events/update-event.dto';

@Controller('events')
export class EventsController {

    constructor(
        private readonly eventsService: EventsService
    ){}

    @Get()
    getAllEvents(
        @Query('limit') limit: number,
        @Query('page') page: number,        
    ){
       return this.eventsService.findAllEvents(limit, page)      
    }

    @Get('count')
    getEventsCount(){
        return this.eventsService.findEventsCount()
    }

    @Get('search')
   getSearchedEvents(
        @Query('q') q: string,
        @Query('limit') limit: number
    ){
        return this.eventsService.findSearchedEvents(q, limit)        
    }

    @Get(':id')
    getOneEvent(
        @Param('id') id: number
    ){
        return this.eventsService.findOneEvent(id)
    }

    @Post()
    createEvent(
        @Body() event: CreateEventDto
    ){
        return this.eventsService.createEvent(event)
    }

    @Patch(':id')
    updateEvent(
        @Body() event: updateEventDto,
        @Param('id') id: number
    ){
        return this.eventsService.updateEvent(event, id)
    }
}
