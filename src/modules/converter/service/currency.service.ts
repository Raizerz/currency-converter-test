import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONVERT_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from '../converter.constant';
import { QueueService } from '../../queue/queue.service';
import { EVENT_TYPE } from '../../queue/queue.constant';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly queueService: QueueService,
  ) {
    this.queueService.emitter.on(EVENT_TYPE['currency-rate.request'], this.handleCurrencyRate);
  }

   private async getRate(data): Promise<any> {
    const { email, ...params } = data;
    try {
      const rateData = await axios.get(CONVERT_URL, {
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
          useQueryString: true,
        },
        params: Object.assign({ format: 'json' }, params),
      });
      this.queueService.sendMessage(EVENT_TYPE['currency-rate.done'], { email, rateData })
    } catch (err) {
      console.log(err)
    }
  }

  private handleCurrencyRate = (body: any) => {
    this.getRate(body.data);
  }
}
