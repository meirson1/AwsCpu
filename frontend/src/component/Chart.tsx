import { useEffect, useRef } from "react";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, Filler, type ChartConfiguration } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Network } from 'lucide-react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  Filler,
  zoomPlugin
);

import { useMetrics } from "../context/MetricsContext";

export default function Chart() {
    const { metrics, activeIp: ip } = useMetrics();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
        const configuration: ChartConfiguration<'line'> = {
            type: 'line',
            data: {
                labels: metrics.map(m => new Date(m.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                datasets: [
                  {
                    label: 'Request Count',
                    backgroundColor: gradient,
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    data: metrics.map(m => m.Value),
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                  },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                      mode: 'index',
                      intersect: false,
                  },
                  title: {
                    display: false,
                  },
                  zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                        modifierKey: 'ctrl',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
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
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            },
        };

        chartRef.current = new ChartJS(ctx, configuration);

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [metrics]);

    return (
        <div className="w-full h-full min-h-[400px]">
            <div className="badge-overlay">
                <Network size={14} className="text-blue-500" />
                IP: {ip}
            </div>
            <canvas ref={canvasRef} />
        </div>
    );
}