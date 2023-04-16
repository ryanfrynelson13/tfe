import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { AddressUserEntity } from 'src/core/models/entities/address-user.entity';
import { CategoryEntity } from 'src/core/models/entities/category.entity';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { PermissionEntity } from 'src/core/models/entities/permission.entity';
import { ReviewEntity } from 'src/core/models/entities/review.entity';
import { SaleEntity } from 'src/core/models/entities/sale.entity';
import { SessionEntity } from 'src/core/models/entities/sessions.entity';
import { TicketPriceEntity } from 'src/core/models/entities/ticket-price.entity';
import { TicketEntity } from 'src/core/models/entities/ticket.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
// import { NewEventType } from 'src/core/types/events/new-event.type';
// import { NewTicketPriceType } from 'src/core/types/tickets/new-ticket-price.type';
// import { NewUserType } from 'src/core/types/users/new-user.type';
// import { createSessionsDates } from 'src/core/utils/sessions.utils';
import { Repository } from 'typeorm';
import * as permissions from 'src/data/permissions.json'
import * as categories from 'src/data/categories.json'

@Injectable()
export class SeederService{
    constructor(
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(EventLocationEntity) private locationRepo: Repository<EventLocationEntity>,
        @InjectRepository(PermissionEntity) private permissionRepo: Repository<PermissionEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(AddressUserEntity) private userAddressRepo: Repository<AddressUserEntity>,
        @InjectRepository(ReviewEntity) private reviewRepo: Repository<ReviewEntity>,
        @InjectRepository(SessionEntity) private sessionRepo: Repository<SessionEntity>,
        @InjectRepository(TicketPriceEntity) private priceRepo: Repository<TicketPriceEntity>,
        @InjectRepository(SaleEntity) private saleRepo: Repository<SaleEntity>,
        @InjectRepository(TicketEntity) private ticketRepo: Repository<TicketEntity>
    ){}

    async populate() {

        for(const permission of permissions){
            let newPerm = await this.permissionRepo.create(permission)
            await this.permissionRepo.save(newPerm)
        }
        
        for(const category of categories){
            let newCat = await this.categoryRepo.create(category)
            await this.categoryRepo.save(newCat)
        }

    }
}