import { Body, Controller, Post } from "@nestjs/common";
import { CreateMultipleSessionsDto } from "src/core/dtos/sessions/create-multiple-sessions.dto";
import { SessionsService } from "src/core/services/sessions/sessions.service";


@Controller('sessions')
export class SessionsController{

    constructor(
        private readonly sessionsService: SessionsService
    ){}

    @Post('multiple')
    createMultipleSessions(
        @Body() body: CreateMultipleSessionsDto
    ){
        const {eventId, datesInfo} = body
        return this.sessionsService.createMultipleSessions(eventId, datesInfo.openDays, datesInfo.startTime, datesInfo.closeTime)
    }
}