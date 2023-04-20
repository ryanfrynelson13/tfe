import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/event.entity';
import { AddressUserEntity } from 'src/core/models/entities/address-user.entity';
import { CategoryEntity } from 'src/core/models/entities/category.entity';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { PermissionEntity } from 'src/core/models/entities/permission.entity';
import { ReviewEntity } from 'src/core/models/entities/review.entity';
import { SaleEntity } from 'src/core/models/entities/sale.entity';
import { TicketPriceEntity } from 'src/core/models/entities/ticket-price.entity';
import { TicketEntity } from 'src/core/models/entities/ticket.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import * as permissions from 'src/data/permissions.json'
import * as categories from 'src/data/categories.json'
import * as usersArr from 'src/data/users.json'
import * as adresses from 'src/data/user-addresses.json'
import * as locations from 'src/data/event-locations.json'
import * as events from 'src/data/events.json'
import * as eventImages from 'src/data/event-image.json'
import * as ticketPrices from 'src/data/ticket-prices.json'
import * as reviews from 'src/data/reviews.json'
import { SessionsService } from "../sessions/sessions.service";


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
        @InjectRepository(TicketPriceEntity) private priceRepo: Repository<TicketPriceEntity>,
        @InjectRepository(SaleEntity) private saleRepo: Repository<SaleEntity>,
        @InjectRepository(TicketEntity) private ticketRepo: Repository<TicketEntity>,
        private sessionsService: SessionsService
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
        const users = usersArr.users
        console.log(users.length)
        for(const userObj of users){
            userObj.user.password = await bcrypt.hash(userObj.user.password, 4)
            const newUser = await this.userRepo.create(userObj.user)

            const userPermission = await this.permissionRepo.findOne({where: {id: userObj.permissionId}})

            newUser.permission = userPermission

            if(userObj.permissionId === 2){

                let random = Math.floor(Math.random() *3)

                const allLoc: EventLocationEntity[] = []

                while(random <= 2){
                    const randomLoc = locations[Math.floor(Math.random() *locations.length)]
                    const location = await this.locationRepo.create(randomLoc)
    
                    await this.locationRepo.save(location)
                    allLoc.push(location)

                    random++
                }

                newUser.locations = allLoc
            }
            await this.userRepo.save(newUser)

            const random = Math.floor(Math.random() *3)

            if(random !== 2){
                const randomAdd =adresses[Math.floor(Math.random() *adresses.length)]
                const address = await this.userAddressRepo.create(randomAdd)

                address.user = newUser

                await this.userAddressRepo.save(address)                
            }

            


        }

        for(let event of events){
            const durations = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]

            event.duration = durations[Math.floor(Math.random() *durations.length)]

            const newEvent = await this.eventRepo.create(event)

            newEvent.imageUrl = eventImages[Math.floor(Math.random() *eventImages.length)]

            const categories = await this.categoryRepo.find({})

            newEvent.category = categories[Math.floor(Math.random() *categories.length)]

            const users = await this.userRepo.find({relations: {permission: true, locations: true}})

            const eventMakers = users.filter(user => user.permission.id === 2)

            newEvent.user = eventMakers[Math.floor(Math.random() *eventMakers.length)]

            newEvent.location = newEvent.user.locations[Math.floor(Math.random() *newEvent.user.locations.length)]

            let randomTicks = Math.floor(Math.random() *6)
            const allTicks: TicketPriceEntity[] = [] 
            while(randomTicks <= 5){
                const ticketPrice = await this.priceRepo.create(ticketPrices[Math.floor(Math.random() *ticketPrices.length)])

                await this.priceRepo.save(ticketPrice)

                allTicks.push(ticketPrice)
                randomTicks ++
            }

            newEvent.tickets = allTicks

            await this.eventRepo.save(newEvent)

            const options = [
                {openDays: [1,2,3,4,5], startTime: '10h30', closeTime: '18h00'},
                {openDays: [1,2,4,5], startTime: '9h00', closeTime: '16h00'},
                {openDays: [1,2,3,4,5,6], startTime: '14h30', closeTime: '20h00'}
            ]

            const sessionParams = options[Math.floor(Math.random() *3)]

            await this.sessionsService.createMultipleSessions(newEvent.id, sessionParams.openDays, sessionParams.startTime, sessionParams.closeTime)            
        }

        let usersForNext = await this.userRepo.find({relations: {sales: true, permission: true, reviews: true, favorites: true}})

        usersForNext = usersForNext.filter(user => user.permission.id === 3)

        const eventsForNext = await this.eventRepo.find({relations: {sessions: true, tickets: true}})
    
        for(const user of usersForNext) {
    
            const randomHasSale = Math.floor(Math.random() *10)
            if(randomHasSale < 8){
                let randomNbSales = Math.floor(Math.random() *25)

                while(randomNbSales <= 24) {

                    const sale = await this.saleRepo.create({createdAt: new Date().toISOString()})
                    
                    sale.user = user

                    await this.saleRepo.save(sale)

                    const event = eventsForNext[Math.floor(Math.random() *eventsForNext.length)]

                    let randomForTicks = Math.floor(Math.random() *10)

                    while(randomForTicks <= 9){
                        const session = event.sessions[Math.floor(Math.random() *event.sessions.length)]
                        const price = event.tickets[Math.floor(Math.random() *event.tickets.length)]

                        const ticket = this.ticketRepo.create()

                        ticket.sale = sale
                        ticket.session = session
                        ticket.ticketPrice = price

                        await this.ticketRepo.save(ticket)
                        randomForTicks ++
                    }

                    

                    randomNbSales++
                }
            }

            const randomHasFavorites = Math.floor(Math.random() *10)
            if(randomHasFavorites < 8){
                let randomNbFavorites = Math.floor(Math.random() *35)
                let checkArr: EventEntity[] = []
                while(randomNbFavorites <= 34) {
                    const event = eventsForNext[Math.floor(Math.random() *eventsForNext.length)]

                    if(!checkArr.some(fav => event.id === fav.id)){
                        user.favorites.push(event)
                        checkArr.push(event)
                        await this.userRepo.save(user)
                    }
                    randomNbFavorites ++
                }
            }

            const userForReviews = await this.userRepo.findOne({where: {id: user.id}, relations: ['sales.tickets.session.event']})

            const eventIdsForReviews = userForReviews.sales.map(sale => {
                return sale.tickets[0].session.event.id
            })

            let checkArr: number[] = []

            for (const eventId of eventIdsForReviews){
                

                let randomHasReview = Math.floor(Math.random() *10)

                if(randomHasReview <= 9 ){
                    const stars = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
                    let comment: string

                    const randomHasComment = Math.floor(Math.random() *10)
                    if(randomHasComment <= 7){
                        comment = reviews[Math.floor(Math.random() *reviews.length)].comment
                    }

                    const review = {
                        stars: stars[Math.floor(Math.random() *stars.length)],
                        comment: comment ? comment : null
                    }

                    const newReview = await this.reviewRepo.create(review)
                    
                    const event = await this.eventRepo.findOneBy({id: eventId})
                    
                    newReview.event = event

                    newReview.user = user

                    if(!checkArr.some(id => id === eventId)){

                        await this.reviewRepo.save(newReview)
                    }

                    checkArr.push(eventId)
                }
            }

           
        }


        return 'done'      


    }
}