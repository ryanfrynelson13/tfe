import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketPriceEntity } from "src/core/models/entities/ticket-price.entity";
import { Repository } from "typeorm";


@Injectable()
export class TicketPricesService{

    constructor(
        @InjectRepository(TicketPriceEntity) private ticketsRepo: Repository<TicketPriceEntity>
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

    async createTicket() {

        const tickets = await this.ticketsRepo.find({relations: ['session']}) 

        console.log(tickets[0])
    }
}