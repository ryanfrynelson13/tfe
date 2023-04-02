import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [UsersController]
})
export class UsersModule {}
