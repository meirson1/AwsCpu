import axios from 'axios';

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
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await axios.get<MetricsResponse>(`${apiUrl}/metrics/cpu`, {
        params: {
            ip,
            startTime,
            endTime,
            interval
        }
    });
    return response.data;
}
