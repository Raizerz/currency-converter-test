import { FetchCurrencyRateDto } from '../dto/fetch-currency-rate.dto';
import { GetCurrencyRateResponse } from '../interface/payload.interface';

export interface IConverterService {
  fetchCurrencyRate(to: string, from: string, data: FetchCurrencyRateDto): GetCurrencyRateResponse;
}
