import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/shared/entities/Event.entity';
import { EventLocationEntity } from 'src/shared/entities/event-location.entity';
import { CategoryEntity } from 'src/shared/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    EventEntity,
    EventLocationEntity,
    CategoryEntity
  ])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
