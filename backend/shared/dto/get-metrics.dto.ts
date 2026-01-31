import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';
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
  @Min(1)
  @Type(() => Number)
  interval: number;
}
