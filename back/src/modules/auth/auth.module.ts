import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { CoreModule } from 'src/core/core.module';


@Module({
  imports: [CoreModule],
  controllers: [AuthController]
})
export class AuthModule {}
