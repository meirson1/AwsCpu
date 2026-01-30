import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetMetricsDto } from '../../shared/dto/get-metrics.dto.js';
import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2';
import {
  CloudWatchClient,
  GetMetricDataCommand,
  GetMetricDataCommandOutput,
} from '@aws-sdk/client-cloudwatch';

@Injectable()
export class MetricsService {
  private ec2Client: EC2Client;
  private cloudWatchClient: CloudWatchClient;
  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    const accessKeyId =
      this.configService.get<string>('AWS_ACCESS_KEY_ID') || '';
    const secretAccessKey =
      this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '';
    const credentials = {
      accessKeyId,
      secretAccessKey,
    };
    this.ec2Client = new EC2Client({ region, credentials });
    this.cloudWatchClient = new CloudWatchClient({ region, credentials });
  }

  async getMetrics(metricsQuery: GetMetricsDto) {
    const instanceId = await this.findInstanceIdByIp(metricsQuery.ip);
    const startTime = new Date(metricsQuery.startTime);
    const endTime = new Date(metricsQuery.endTime);
    const interval = metricsQuery.interval;

    if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
      throw new BadRequestException('Invalid startTime/endTime');
    }
    if (startTime >= endTime) {
      throw new BadRequestException('startTime must be before endTime');
    }
    if (!Number.isFinite(interval) || interval <= 0) {
      throw new BadRequestException(
        'interval must be a positive number (seconds)',
      );
    }

    let response: GetMetricDataCommandOutput;
    try {
      response = await this.cloudWatchClient.send(
        new GetMetricDataCommand({
          MetricDataQueries: [
            {
              Id: 'cpu',
              MetricStat: {
                Metric: {
                  Namespace: 'AWS/EC2',
                  MetricName: 'CPUUtilization',
                  Dimensions: [
                    {
                      Name: 'InstanceId',
                      Value: instanceId,
                    },
                  ],
                },
                Period: interval,
                Stat: 'Average',
              },
            },
          ],
          StartTime: startTime,
          EndTime: endTime,
        }),
      );
    } catch (error) {
      Logger.error(
        `Failed to fetch CloudWatch metrics: ${(error as Error).message}`,
        'MetricsService',
      );
      throw new InternalServerErrorException(
        'Failed to retrieve metrics from AWS CloudWatch',
      );
    }

    Logger.log(
      response.MetricDataResults?.[0]?.Values,
      'MetricsService.getMetrics',
    );

    const metricData = response.MetricDataResults?.[0];
    const timestamps = metricData?.Timestamps || [];
    const values = metricData?.Values || [];

    if (values.length > 0 && timestamps.length === 0) {
      Logger.warn(
        `CloudWatch returned ${values.length} values but NO timestamps!`,
        'MetricsService',
      );
    }

    const formattedMetrics = timestamps.map((timestamp, index) => ({
      Timestamp: timestamp,
      Value: values[index],
    }));

    Logger.log(
      `Returning ${formattedMetrics.length} formatted metrics used by Frontend`,
      'MetricsService',
    );

    return { instanceId, metrics: formattedMetrics };
  }

  async findInstanceIdByIp(ip: string) {
    const response = await this.ec2Client.send(
      new DescribeInstancesCommand({
        Filters: [{ Name: 'private-ip-address', Values: [ip] }],
      }),
    );
    const instance = response.Reservations?.[0]?.Instances?.[0];
    if (!instance) {
      throw new NotFoundException(`Instance not found for IP: ${ip}`);
    }
    if (!instance.InstanceId) {
      throw new InternalServerErrorException(
        'InstanceId missing in AWS response',
      );
    }
    return instance.InstanceId;
  }
}
