import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { GetMetricsDto } from '../../shared/dto/get-metrics.dto.js';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('cpu')
  @HttpCode(HttpStatus.OK)
  getMetrics(@Query() metricsQuery: GetMetricsDto) {
    return this.metricsService.getMetrics(metricsQuery);
  }
}
