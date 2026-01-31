import { useState, type ReactNode } from 'react';
import { getMetrics, type MetricDataPoint } from '../api/metrics';
import { MetricsContext } from './MetricsContext';

export function MetricsProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<MetricDataPoint[]>([]);
  const [activeIp, setActiveIp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async (ip: string, startTime: string, endTime: string, interval: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMetrics(ip, startTime, endTime, interval);
      setMetrics(response.metrics);
      setActiveIp(ip);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MetricsContext.Provider value={{ metrics, activeIp, loading, error, fetchMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
}
