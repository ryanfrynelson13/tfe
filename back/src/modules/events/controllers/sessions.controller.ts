import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateMultipleSessionsDto } from "src/core/dtos/sessions/create-multiple-sessions.dto";
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

    @Post('multiple')
    createMultipleSessions(
        @Body() body: CreateMultipleSessionsDto
    ){
        const {eventId, datesInfo} = body
        return this.sessionsService.createMultipleSessions(eventId, datesInfo.openDays, datesInfo.startTime, datesInfo.closeTime)
    }
}