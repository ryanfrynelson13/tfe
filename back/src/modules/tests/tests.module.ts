import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [TestsController]
})
export class TestsModule {}
