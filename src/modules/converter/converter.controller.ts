import { Body, Controller, Get, Inject, Param, Req, Request, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { FetchCurrencyRateDto, FetchCurrencyRateParamsDto } from './dto/fetch-currency-rate.dto';
import { GetCurrencyRateResponse } from './interface/payload.interface';
import { ConverterService } from './service/converter.service';
import { CONVERTER_TYPES } from './converter.constant';

@ApiUseTags('currency-converter')
@Controller('currency-converter')
export class CurrencyConverterController {
  constructor(
    @Inject(CONVERTER_TYPES.IConverterService) private readonly converterService: ConverterService
  ) {}

  @Get(':to/:from')
  public getCurrencyRate(@Body() dto: FetchCurrencyRateDto, @Param() params: FetchCurrencyRateParamsDto): GetCurrencyRateResponse {
    return this.converterService.fetchCurrencyRate(params.to, params.from, dto);
  }
}
