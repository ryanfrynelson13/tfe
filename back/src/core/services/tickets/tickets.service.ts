import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleEntity } from "src/core/models/entities/sale.entity";
import { SessionEntity } from "src/core/models/entities/sessions.entity";
import { TicketPriceEntity } from "src/core/models/entities/ticket-price.entity";
import { TicketEntity } from "src/core/models/entities/ticket.entity";
import { Repository } from "typeorm";
import { SessionsService } from "../sessions/sessions.service";


@Injectable()
export class TicketsService{

    constructor(
        @InjectRepository(TicketEntity) private ticketsRepo: Repository<TicketEntity>,
        @InjectRepository(TicketPriceEntity) private ticketsPriceRepo: Repository<TicketPriceEntity>,
        @InjectRepository(SaleEntity) private salesRepo: Repository<SaleEntity>,
        @InjectRepository(SessionEntity) private sessionsRepo: Repository<SessionEntity>,
        private readonly sessionsService: SessionsService
    ){}

    async createTicket(saleId: number, sessionId: number, ticketPriceId: number) {

        const sale = await this.salesRepo.findOneBy({id: saleId})
        const session = await this.sessionsService.buyTicket(sessionId)
        const price = await this.ticketsPriceRepo.findOneBy({id: ticketPriceId})       

        const ticket = await this.ticketsRepo.create() 

        ticket.sale = sale
        ticket.session = session
        ticket.ticketPrice = price 
        
        return this.ticketsRepo.save(ticket)

    }

    getTickets(saleId: number){

        return this.ticketsRepo.find({
            relations: {
                sale: true,
                session: {event: true},
                ticketPrice: true
            },
            where: {
                sale: {
                    id: saleId
                }
            }
            
        })
    }

}