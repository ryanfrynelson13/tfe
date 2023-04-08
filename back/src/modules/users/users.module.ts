import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CoreModule } from 'src/core/core.module';
import { FavoritesController } from './controllers/favorites.controller';

@Module({
  imports: [CoreModule],
  controllers: [UsersController, FavoritesController]
})
export class UsersModule {}
