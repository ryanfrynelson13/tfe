import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketPriceEntity } from "src/core/models/entities/ticket-price.entity";
import { NewTicketPriceType } from "src/core/types/tickets/new-ticket-price.type";
import { Repository } from "typeorm";
import { EventsService } from "../events/events.service";


@Injectable()
export class TicketPricesService{

    constructor(
        @InjectRepository(TicketPriceEntity) private ticketsRepo: Repository<TicketPriceEntity>,
        private readonly eventsService: EventsService
    ){}

    async getHighestAndLowest() {
        const [lowest] = await this.ticketsRepo.find({
            order: {
                pricePerTicket: 'ASC'
            }
        })
        const [highest] = await this.ticketsRepo.find({
            order: {
                pricePerTicket: 'DESC'
            }
        })
        return [lowest.pricePerTicket, highest.pricePerTicket]
    }

    async createTicket(newTicket: NewTicketPriceType) {

        const event = await  this.eventsService.findOneEvent(newTicket.eventId)

        const ticket = await this.ticketsRepo.create(newTicket.ticket)

        ticket.event = event

        return this.ticketsRepo.save(ticket)
    }
}