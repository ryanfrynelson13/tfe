import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { PermissionEntity } from 'src/shared/entities/permission.entity';
import { AddressUserEntity } from 'src/shared/entities/address-user.entity';
import { EventEntity } from 'src/shared/entities/Event.entity';
import { EventLocationEntity } from 'src/shared/entities/event-location.entity';
import { CategoryEntity } from 'src/shared/entities/category.entity';
import { ReviewEntity } from 'src/shared/entities/review.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PermissionEntity,
      AddressUserEntity,
      EventEntity,
      EventLocationEntity,
      CategoryEntity,
      ReviewEntity
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
