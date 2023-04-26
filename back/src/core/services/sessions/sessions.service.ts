import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from 'src/core/models/entities/event.entity';
import { SessionEntity } from "src/core/models/entities/sessions.entity";
import { createSessionsDates } from 'src/core/utils/sessions.utils';
import { Repository } from "typeorm";


@Injectable()
export class SessionsService {

    constructor(
        @InjectRepository(SessionEntity) private sessionsRepo: Repository<SessionEntity>,
        @InjectRepository(EventEntity) private eventsRepo: Repository<EventEntity>
    ){}

    async findOneSession(id: number) {
        const session = await this.sessionsRepo.findOneBy({id: id})

        if(!session){
            throw new NotFoundException('session not found')
        }

        return session
    }

    async createSession(eventId: number, startTime: string){

        const event = await this.eventsRepo.findOne({where:{id: eventId},relations: {sessions: true}})

        const placesLeft = event.places

        const session = await this.sessionsRepo.create({startTime, placesLeft: placesLeft})

        session.event = event

        return this.sessionsRepo.save(session)
    }

    async createMultipleSessions(eventId: number, openDays: number[], startTime: string, closeTime: string) {

        const event = await this.eventsRepo.findOne({where:{id: eventId},relations: {sessions: true}})
        
        const allDates = createSessionsDates(event, openDays, startTime.split('h'), closeTime.split('h'))

        const placesLeft = event.places

        for(const date of allDates){
            const session = await this.sessionsRepo.create({startTime: date, placesLeft: placesLeft})
            session.event = event

            this.sessionsRepo.save(session)
        }

        return event.sessions
    }

    async buyTicket(sessionId: number) {

        const session = await this.sessionsRepo.findOneBy({id: sessionId})

        if(!session){
            throw new NotFoundException('session not found')
        }

        if(session.placesLeft === 0){
            throw new BadRequestException('no more places')
        }


        session.placesLeft -= 1

        return this.sessionsRepo.save(session)
    }
}