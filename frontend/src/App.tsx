import { useState } from 'react';
import MetricsForm from './component/MetricsForm';
import Chart from './component/Chart';
import { getMetrics, type MetricDataPoint } from './api/metrics';

function App() {
  const [metrics, setMetrics] = useState<MetricDataPoint[]>([]);
  const [activeIp, setActiveIp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (ip: string, startTime: string, endTime: string, interval: string) => {
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
    <div className="dashboard-container pt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 pb-6">
        
        <div className="lg:col-span-4">
          <div className="card">
            <h2 className="section-title">Search Parameters</h2>
            <MetricsForm onSubmit={onSubmit}/>
          </div>
        </div>

        <div className="lg:col-span-8">
           <div className="card min-h-[500px] relative">
             <div className="flex items-center justify-between mb-6">
               <h2 className="section-title">Analysis Result: Request Frequency over Time</h2>
             </div>
             
             {loading ? (
                <div className="flex items-center justify-center h-64 text-gray-500">Loading metrics...</div>
             ) : (
                <>
                  {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">Error: {error}</div>}
                  {metrics.length > 0 ? (
                    <Chart metrics={metrics} ip={activeIp} />
                  ) : (
                    !error && <div className="text-center text-gray-500 py-20">No data found for the selected range.</div>
                  )}
                </>
             )}
           </div>
        </div>

      </div>
    </div>
  )
}

export default App;