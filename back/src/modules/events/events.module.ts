import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { CoreModule } from 'src/core/core.module';
import { CategoriesController } from './controllers/categories.controller';
import { ticketscontroller } from './controllers/tickets.controller';

@Module({
  imports: [CoreModule],
  controllers: [EventsController, CategoriesController, ticketscontroller]
})
export class EventsModule {}
