import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, Request } from '@nestjs/common';
import { EventsService } from '../../../core/services/events/events.service';
import { CreateEventDto } from 'src/core/dtos/events/create-event.dto';
import { updateEventDto } from 'src/core/dtos/events/update-event.dto';
import { FiltersDto } from 'src/core/dtos/events/filters.dto';
import { AuthGard } from 'src/core/guards/auth.guard';

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
    
    @UseGuards(AuthGard)
    @Get('user')
    getUserEvents(
        @Request() req
    ){
        const user = req.user
        return this.eventsService.getUserEvents(user.id)
    }  

    @UseGuards(AuthGard)
    @Post('create')
    createEvent(
        @Request() req,
        @Body() event: CreateEventDto
    ){
        console.log('hi')
        const {id} = req.user
        return this.eventsService.createEvent(id, event)
    }

    @Get(':id')
    getOneEvent(
        @Param('id') id: number
    ){
        return this.eventsService.findOneEvent(id)
    }

    @Patch(':id')
    updateEvent(
        @Body() event: updateEventDto,
        @Param('id') id: number
    ){
        return this.eventsService.updateEvent(event, id)
    }

   
}
