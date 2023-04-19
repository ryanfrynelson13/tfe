import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [SeederController]
})
export class SeederModule {}
