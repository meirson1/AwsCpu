import { Module } from '@nestjs/common';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MetricsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
