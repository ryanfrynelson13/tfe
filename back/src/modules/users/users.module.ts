import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CoreModule } from 'src/core/core.module';
import { FavoritesController } from './controllers/favorites.controller';
import { SalesController } from './controllers/sales.controller';

@Module({
  imports: [CoreModule],
  controllers: [UsersController, FavoritesController, SalesController]
})
export class UsersModule {}
