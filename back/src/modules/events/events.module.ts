import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [EventsController]
})
export class EventsModule {}
