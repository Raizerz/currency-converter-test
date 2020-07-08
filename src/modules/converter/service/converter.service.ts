import { Injectable } from '@nestjs/common';
import { QueueService } from '../../queue/queue.service';
import { EVENT_TYPE } from '../../queue/queue.constant';
import { FetchCurrencyRateDto } from '../dto/fetch-currency-rate.dto';
import { CurrencyRateEventData, GetCurrencyRateResponse } from '../interface/payload.interface';
import { IConverterService } from './iconverter.service';
import { EmailService } from './email.service';

@Injectable()
export class ConverterService implements IConverterService {
  constructor(
    private readonly emailService: EmailService,
    private readonly queueService: QueueService,
  ) {
    this.queueService.emitter.on(EVENT_TYPE['currency-rate.done'], this.handleCurrencyRateDone);
  }

  public fetchCurrencyRate(to: string, from: string, data: FetchCurrencyRateDto): GetCurrencyRateResponse {
    this.queueService.sendMessage(EVENT_TYPE['currency-rate.request'], {
      to,
      from,
      ...data,
    });
    return {
      message: 'Added to processing',
    };
  }

  private handleCurrencyRateDone = (body: CurrencyRateEventData): void => {
    this.emailService.send(body.email, body.rateData);
  }
}
