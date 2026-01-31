import { create } from 'zustand';
import { getMetrics, type MetricDataPoint } from '../api/metrics';

interface MetricsState {
  metrics: MetricDataPoint[];
  activeIp: string;
  loading: boolean;
  error: string | null;
  fetchMetrics: (ip: string, startTime: string, endTime: string, interval: string) => Promise<void>;
}

export const useMetricsStore = create<MetricsState>()((set) => ({
  metrics: [],
  activeIp: '',
  loading: false,
  error: null,
  fetchMetrics: async (ip: string, startTime: string, endTime: string, interval: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getMetrics(ip, startTime, endTime, interval);
      set({ metrics: response.metrics, activeIp: ip, loading: false });
    } catch (error) {
      set({ error: error as string, loading: false });
    }
  },
}));
