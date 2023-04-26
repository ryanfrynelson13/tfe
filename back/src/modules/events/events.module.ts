import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { CoreModule } from 'src/core/core.module';
import { CategoriesController } from './controllers/categories.controller';
import { ticketPricescontroller } from './controllers/ticket-prices.controller';
import { SessionsController } from './controllers/sessions.controller';
import { LocationsController } from './controllers/locations.controller';

@Module({
  imports: [CoreModule],
  controllers: [EventsController, CategoriesController, ticketPricescontroller, SessionsController, LocationsController]
})
export class EventsModule {}
