import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/reviews.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule
  ],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
