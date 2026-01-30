import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMetricsDto {
  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsNumber()
  @Type(() => Number)
  interval: number;
}
