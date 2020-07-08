import { Module } from '@nestjs/common';
import { ConverterModule } from './modules/converter/converter.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    ConverterModule,
    QueueModule,
  ],
})
export class AppModule {}
