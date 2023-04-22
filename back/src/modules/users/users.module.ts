import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CoreModule } from 'src/core/core.module';
import { FavoritesController } from './controllers/favorites.controller';
import { AddressesController } from './controllers/addresses.controller';

@Module({
  imports: [CoreModule],
  controllers: [UsersController, FavoritesController, AddressesController]
})
export class UsersModule {}
