import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { CONVERTER_TYPES } from './converter.constant';
import { CurrencyConverterController } from './converter.controller';
import { converterProviders } from './converter.provider';
@Module({
  imports: [QueueModule],
  providers: [...converterProviders],
  controllers: [CurrencyConverterController],
  exports: [CONVERTER_TYPES.IConverterService],
})
export class ConverterModule {}
