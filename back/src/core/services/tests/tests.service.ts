import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/event.entity';
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
import { NewEventType } from 'src/core/types/events/new-event.type';
import { NewTicketPriceType } from 'src/core/types/tickets/new-ticket-price.type';
import { NewUserType } from 'src/core/types/users/new-user.type';
import { createSessionsDates } from 'src/core/utils/sessions.utils';
import { Repository } from 'typeorm';

@Injectable()
export class TestsService {

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

    async changeDuration() {
        const durations = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]

        const allEvents = await this.eventRepo.find({})

        for(const event of allEvents){
            event.duration = durations[Math.floor(Math.random() * durations.length)]

            await this.eventRepo.save(event)
        }

        return 'done'
    }

    async populateLocation(location){
        const newLocation = await this.locationRepo.create(location)

        return this.locationRepo.save(newLocation)
    }

    async populateCategory(category){
        const newCategory = await this.categoryRepo.create(category)

        return this.categoryRepo.save(newCategory)
    }

    async populateEvent(body: NewEventType){

        const newEvent: EventEntity = await this.eventRepo.create(body.event)

        const category = await this.categoryRepo.findOne({where:{id: body.categoryId}})
        const location= await this.locationRepo.findOne({where:{id: body.locationId}})

        newEvent.category = category
        newEvent.location = location

        return this.eventRepo.save(newEvent)
    }

    async populatePermissions(permission){
        const newPermission = await this.permissionRepo.create(permission)

        return this.permissionRepo.save(newPermission)
    }

    async populateUsers(body: NewUserType){

        const newUser: UserEntity = await this.userRepo.create(body.user)

        const permission = await this.permissionRepo.findOne({where:{id: body.permissionId}})
        

        newUser.permission = permission

        return this.userRepo.save(newUser)
    }

    async populateAddresses(body: NewAddressType){

        const newAddress: AddressUserEntity = await this.userAddressRepo.create(body.address)

        const user = await this.userRepo.findOne({where:{id: body.userId}})
        

        newAddress.user = user

        return this.userAddressRepo.save(newAddress)
    }

    async populateReviews(body){

        // const newReview: ReviewEntity = await this.reviewRepo.create(body.review)

        // const user = await this.userRepo.findOne({where:{id: body.userId}})
        // const event = await this.eventRepo.findOne({where:{id: body.eventId}})
        

        // newReview.user = user
        // newReview.event = event

        // return this.reviewRepo.save(newReview)
    }

    async populateFavorites(body: {userId: number, eventId: number}){
        const user = await this.userRepo.findOne({where:{id: body.userId}, relations: {favorites: true}})
        const event = await this.eventRepo.findOne({where:{id: body.eventId}})

        user.favorites.push(event)

        return this.userRepo.save(user)
    }

    async populateSessions(body: {eventId: number, startTime: string}){

        const event = await this.eventRepo.findOne({where:{id: body.eventId}})

        const placesLeft = event.places

        const session = await this.sessionRepo.create({startTime: body.startTime, placesLeft: placesLeft})

        session.event = event

        return this.sessionRepo.save(session)
    }

    async createSession () {
        // const test = createSessionsDates()
        // return test
    }

    async populatePrices(body: NewTicketPriceType){

        const newTicketPrice: TicketPriceEntity= await this.priceRepo.create(body.ticket)

        const event = await this.eventRepo.findOne({where:{id: body.eventId}})
        

        newTicketPrice.event = event

        return this.priceRepo.save(newTicketPrice)
    }

    async populateSales(body: { createdAt: string, userId: number}){
        const user = await this.userRepo.findOne({where:{id: body.userId}, relations: {sales: true}})
        const sale = await this.saleRepo.create({createdAt: body.createdAt})

        sale.user = user

        return this.saleRepo.save(sale)
    }

    async populateTickets(body: { sessionId: number, saleId: number, ticketPriceId: number}){
        const sale = await this.saleRepo.findOne({where: {id: body.saleId}})
        const ticketPrice = await this.priceRepo.findOne({where: {id: body.ticketPriceId}})
        const session = await this.sessionRepo.findOne({where: {id: body.sessionId}})

        const ticket = await this.ticketRepo.create()

        ticket.sale = sale
        ticket.session = session
        ticket.ticketPrice = ticketPrice

        return this.ticketRepo.save(ticket)
    }
}
