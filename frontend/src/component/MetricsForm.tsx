import { useState } from "react";
import { Network, Calendar, Search, Clock } from 'lucide-react';

interface MetricsFormProps {
    onSubmit: (ip: string, startTime: string, endTime: string, interval: string) => void;
}

export default function MetricsForm({ onSubmit }: MetricsFormProps) {
    const [ip, setIp] = useState(import.meta.env.VITE_DEFAULT_IP || "");
    
    const splitDateTime = (isoString: string) => {
        const [date, time] = isoString.split('T');
        return { date, time: time.slice(0, 5) };
    };

    const toLocalISO = (date: Date) => {
        const offset = date.getTimezoneOffset() * 60000; 
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, 16);
    };

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const startSplit = splitDateTime(toLocalISO(oneHourAgo));
    const endSplit = splitDateTime(toLocalISO(now));

    const [startDate, setStartDate] = useState(startSplit.date);
    const [startTime, setStartTime] = useState(startSplit.time);
    const [endDate, setEndDate] = useState(endSplit.date);
    const [endTime, setEndTime] = useState(endSplit.time);
    
    const [interval, setInterval] = useState("60");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!ip) {
            setError("IP address is required");
            return;
        }

        const startISO = `${startDate}T${startTime}:00`;
        const endISO = `${endDate}T${endTime}:00`;
        
        const start = new Date(startISO);
        const end = new Date(endISO);
        const intVal = parseInt(interval, 10);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
             setError("Invalid start or end time");
             return;
        }

        if (start >= end) {
            setError("Start time must be strictly before end time");
            return;
        }

        if (isNaN(intVal) || intVal <= 0) {
            setError("Interval must be positive");
            return;
        }

        onSubmit(ip, startISO, endISO, interval);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm mb-4">
                    {error}
                </div>
            )}
            
            <div className="form-group">
                <label htmlFor="ip" className="form-label">IP Address</label>
                <div className="input-icon-wrapper">
                    <div className="input-icon-left">
                        <Network size={18} />
                    </div>
                    <input 
                        id="ip"
                        type="text" 
                        placeholder="172.31.88.161" 
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="form-input form-input-icon"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Start Period</label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="input-icon-wrapper">
                        <div className="input-icon-left">
                            <Calendar size={16} />
                        </div>
                        <input 
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="form-input form-input-icon !px-2 !pl-9"
                        />
                    </div>
                    <div className="input-icon-wrapper">
                        <div className="input-icon-left">
                            <Clock size={16} />
                        </div>
                        <input 
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="form-input form-input-icon !px-2 !pl-8"
                        />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">End Period</label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="input-icon-wrapper">
                        <div className="input-icon-left">
                            <Calendar size={16} />
                        </div>
                        <input 
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="form-input form-input-icon !px-2 !pl-8"
                        />
                    </div>
                    <div className="input-icon-wrapper">
                        <div className="input-icon-left">
                            <Clock size={16} />
                        </div>
                        <input 
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="form-input form-input-icon !px-2 !pl-8"
                        />
                    </div>
                </div>
            </div>



            <div className="form-group">
                <label htmlFor="interval" className="form-label">Interval (seconds)</label>
                <div className="input-icon-wrapper">
                    <div className="input-icon-left">
                        <Clock size={18} />
                    </div>
                    <input 
                        id="interval"
                        type="text" 
                        placeholder="60" 
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                        className="form-input form-input-icon"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button type="submit" className="btn-primary">
                    <Search size={18} />
                    Search Metrics
                </button>
            </div>
        </form>
    );
}