import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class FetchCurrencyRateDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsPositive()
  public readonly amount!: number;

  @ApiModelProperty()
  @IsEmail()
  public readonly email!: string;
}

export class FetchCurrencyRateParamsDto {
  @ApiModelProperty()
  @IsNotEmpty()
  public readonly from!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  public readonly to!: string;

}
