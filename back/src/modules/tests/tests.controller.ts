import { Body, Controller, Post } from '@nestjs/common';
import { TestsService } from '../../core/services/tests/tests.service';
import * as events from 'src/data/events.json'
import * as locations from 'src/data/event-locations.json'
import * as categories from 'src/data/categories.json'
import * as permissions from 'src/data/permissions.json'
import * as users from 'src/data/users.json'
import * as addresses from 'src/data/user-addresses.json'
import * as reviews from 'src/data/reviews.json'
import * as sessions from 'src/data/sessions.json'
import * as sales from 'src/data/sales.json'
import * as ticketPrices from 'src/data/ticket-prices.json'
import * as tickets from 'src/data/tickets.json'



@Controller('tests')
export class TestsController {

    constructor(
        private readonly testsService: TestsService
    ){}

    @Post('categories')
    async populateCategories(
        @Body() body: any
    ){
        for(const category of categories){
            await this.testsService.populateCategory(category)
        }
        return 'done'
    }

    @Post('locations')
    async populateLocations(
        @Body() body: any
    ){
        for(const location of locations){
            await this.testsService.populateLocation(location)
        }
        return 'done'
    }

    @Post('events')
    async populateEvents(
        @Body() body: any
    ){
        for(const event of events){
            await this.testsService.populateEvent(event)
        }
        return 'done'
    }

    @Post('permissions')
    async populatePermissions(
        @Body() body: any
    ){
        for(const permission of permissions){
            await this.testsService.populatePermissions(permission)
        }
        return 'done'
    }

    @Post('users')
    async populateUsers(){
        for( const user of users){
            await this.testsService.populateUsers(user)
        }

        return 'done'
    }

    @Post('addresses')
    async populateAddresses(){
        for( const address of addresses){
            await this.testsService.populateAddresses(address)
        }

        return 'done'
    }

    @Post('reviews')
    async populateReviews(){
        for( const review of reviews){
            await this.testsService.populateReviews(review)
        }

        return 'done'
    }

    @Post('sessions')
    async populateSessions(){
        for( const session of sessions){
            await this.testsService.populateSessions(session)
        }

        return 'done'
    }

    @Post('ticket-prices')
    async populatePrices(){
        for( const price of ticketPrices){
            await this.testsService.populatePrices(price)
        }

        return 'done'
    }

    @Post('sales')
    async populateSales(){
        for( const sale of sales){
            await this.testsService.populateSales(sale)
        }

        return 'done'
    }

    @Post('tickets')
    async populateTickets(){
        for( const ticket of tickets){
            await this.testsService.populateTickets(ticket)
        }

        return 'done'
    }
}
