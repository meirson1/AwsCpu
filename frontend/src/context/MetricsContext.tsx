import { createContext, useContext } from 'react';
import type { MetricDataPoint } from '../api/metrics';

interface MetricsContextType {
  metrics: MetricDataPoint[];
  activeIp: string;
  loading: boolean;
  error: string | null;
  fetchMetrics: (ip: string, startTime: string, endTime: string, interval: string) => Promise<void>;
}

export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export function useMetrics() {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
}
