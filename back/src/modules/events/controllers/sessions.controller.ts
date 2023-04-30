import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateMultipleSessionsDto } from "src/core/dtos/sessions/create-multiple-sessions.dto";
import { CreateSessionDto } from "src/core/dtos/sessions/create-session.dto";
import { SessionsService } from "src/core/services/sessions/sessions.service";


@Controller('sessions')
export class SessionsController{

    constructor(
        private readonly sessionsService: SessionsService
    ){}

    @Get(':id')
    getone(
        @Param('id') id: number
    ){
        return this.sessionsService.findOneSession(id)
    }

    @Post()
    createOne(
        @Body() body: CreateSessionDto
    ){
        return this.sessionsService.createSession(body.eventId, body.startTime)
    }

    @Post('multiple')
    createMultipleSessions(
        @Body() body: CreateMultipleSessionsDto
    ){
        const {eventId, datesInfo} = body
        return this.sessionsService.createMultipleSessions(eventId, datesInfo.openDays, datesInfo.startTime, datesInfo.closeTime)
    }
}