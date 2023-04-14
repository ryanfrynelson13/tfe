import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EventsService } from '../../../core/services/events/events.service';
import { CreateEventDto } from 'src/core/dtos/events/create-event.dto';
import { updateEventDto } from 'src/core/dtos/events/update-event.dto';
import { FiltersDto } from 'src/core/dtos/events/filters.dto';

@Controller('events')
export class EventsController {

    constructor(
        private readonly eventsService: EventsService
    ){}

    @Post()
    getAllEvents(
        @Query('limit') limit: number,
        @Query('page') page: number,        
        @Query('sortBy') sortBy: string,   
        @Body() filters: FiltersDto
    ){


       return this.eventsService.findAllEvents(limit, page, sortBy, filters)      
    }

    @Post('count')
    getEventsCount(
        @Body() filters: FiltersDto
    ){
        return this.eventsService.findEventsCount(filters)
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
