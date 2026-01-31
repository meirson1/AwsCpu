import MetricsForm from '../component/MetricsForm';
import Chart from '../component/Chart';
import { useMetricsStore } from '../store/useMetricsStore';

export default function DashboardPage() {
  const { metrics, loading, error } = useMetricsStore();

  return (
    <div className="dashboard-container pt-12">
      <div className="w-full py-10">
        <h1 className="text-3xl font-bold text-center text-gray-900">AWS CPU Metrics</h1>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-6 pb-6 items-stretch">
        
        <div className="col-span-12 md:col-span-4 flex flex-col">
          <div className="card flex-1 flex flex-col">
            <MetricsForm className="!shadow-none !bg-transparent !p-0 flex-1" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 flex flex-col">
           <div className="card min-h-[500px] relative flex-1 flex flex-col">
             <h2 className="section-title">CPU Usage</h2>
             
             {loading ? (
                <div className="flex items-center justify-center flex-1 text-gray-500">Loading metrics...</div>
             ) : (
                <div className="flex-1 flex flex-col">
                  {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">Error: {error}</div>}
                  {metrics.length > 0 ? (
                    <div className="flex-1 min-h-0">
                        <Chart />
                    </div>
                  ) : (
                    !error && <div className="text-center text-gray-500 py-20">No data found for the selected range.</div>
                  )}
                </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}
