import MetricsForm from './MetricsForm';
import Chart from './Chart';
import { useMetrics } from '../context/MetricsContext';
import { MetricsProvider } from '../context/MetricsProvider';

function DashboardContent() {
  const { metrics, loading, error } = useMetrics();

  return (
    <div className="dashboard-container pt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 grid-cols-12 gap-8 px-6 pb-6">
        
        <div className="col-span-4">
          <div className="card">
            <h2 className="section-title">Search Parameters</h2>
            <MetricsForm />
          </div>
        </div>

        <div className="col-span-8">
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
                    <Chart />
                  ) : (
                    !error && <div className="text-center text-gray-500 py-20">No data found for the selected range.</div>
                  )}
                </>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <MetricsProvider>
      <DashboardContent />
    </MetricsProvider>
  );
}

export default DashboardPage;
