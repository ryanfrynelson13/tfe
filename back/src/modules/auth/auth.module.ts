import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { PermissionEntity } from 'src/shared/entities/permission.entity';
import { AddressUserEntity } from 'src/shared/entities/address-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PermissionEntity,
      AddressUserEntity
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
