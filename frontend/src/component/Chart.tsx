import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Network } from 'lucide-react';
import { useMetrics } from "../context/MetricsContext";
import { useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

export default function Chart() {
  const { metrics, activeIp: ip } = useMetrics();

  const data = useMemo(() => {
    const labels = metrics.map(m => new Date(m.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    return {
      labels,
      datasets: [
        {
          label: 'Request Count',
          data: metrics.map(m => m.Value),
          borderColor: '#3b82f6',
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
        },
      ],
    };
  }, [metrics]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as const,
          modifierKey: 'ctrl' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x' as const,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grace: '50%',
        border: { display: false },
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
            color: '#9ca3af',
            font: { size: 10 }
        },
        title: {
            display: true,
            text: 'Request Count',
            color: '#9ca3af',
            font: { size: 12 }
        }
      },
      x: {
        border: { display: false },
        grid: {
          display: false
        },
        ticks: {
            color: '#9ca3af',
            font: { size: 10 },
            maxTicksLimit: 8
        },
        title: {
            display: true,
            text: 'Time',
            color: '#9ca3af',
            font: { size: 12 }
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
  }), []);

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <div className="badge-overlay">
        <Network size={14} className="text-blue-500" />
        IP: {ip}
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
