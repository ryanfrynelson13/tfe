import { Module } from '@nestjs/common';
import { SalesController } from './controller/sales.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [SalesController]
})
export class SalesModule {}
