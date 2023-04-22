import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from 'src/core/models/entities/sale.entity';
import { TicketEntity } from 'src/core/models/entities/ticket.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { Basket } from 'src/core/types/basket/basket.type';
import { Repository } from 'typeorm';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class SalesService{

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(SaleEntity) private saleRepo: Repository<SaleEntity>,
        private readonly ticketsService: TicketsService
    ){}

    async createSale (userId: number, basket: Basket) {
       
        const user = await this.userRepo.findOneBy({id: userId})
        const sale = await this.saleRepo.create({total: basket.total})

        sale.user = user

        const savedSale = await this.saleRepo.save(sale)

        for(const product of basket.products){
            for(const ticket of product.tickets){
                for(let i = 0; i < ticket.nb; i++){
                    await this.ticketsService.createTicket(savedSale.id, product.sessionId, ticket.id)
                }
            }
        }

        return savedSale
     }
}