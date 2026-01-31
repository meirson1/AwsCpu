import { apiClient } from './client';

export interface MetricDataPoint {
    Timestamp: string;
    Value: number;
    Unit?: string;
}

export interface MetricsResponse {
    instanceId: string;
    metrics: MetricDataPoint[];
}

export const getMetrics = async (ip: string, startTime: string, endTime: string, interval: string): Promise<MetricsResponse> => {
    const response = await apiClient.get<MetricsResponse>('/metrics/cpu', {
        params: {
            ip,
            startTime,
            endTime,
            interval
        }
    });
    return response.data;
}
