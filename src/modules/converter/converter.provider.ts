import { ConverterService } from './service/converter.service';
import { CurrencyService } from './service/currency.service';
import { EmailService } from './service/email.service';
import { CONVERTER_TYPES } from './converter.constant';

export const converterProviders = [
  {
    provide: CONVERTER_TYPES.IConverterService,
    useClass: ConverterService,
  },
  CurrencyService,
  EmailService,
];
