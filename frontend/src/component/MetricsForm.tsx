import { useForm } from "react-hook-form";
import { Network, Calendar, Search, Clock } from 'lucide-react';
import { useState } from "react";

interface MetricsFormProps {
    onSubmit: (ip: string, startTime: string, endTime: string, interval: string) => void;
}

interface FormInputs {
    ip: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    interval: string;
}

export default function MetricsForm({ onSubmit }: MetricsFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [customError, setCustomError] = useState<string | null>(null);

    const onFormSubmit = (data: FormInputs) => {
        setCustomError(null);
        const { ip, startDate, startTime, endDate, endTime, interval } = data;
        
        const startISO = `${startDate}T${startTime}:00`;
        const endISO = `${endDate}T${endTime}:00`;
        
        const start = new Date(startISO);
        const end = new Date(endISO);
        const intVal = parseInt(interval, 10);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
             setCustomError("Invalid start or end time format");
             return;
        }

        if (start >= end) {
            setCustomError("Start time must be strictly before end time");
            return;
        }

        if (isNaN(intVal) || intVal <= 0) {
            setCustomError("Interval must be a positive number");
            return;
        }

        onSubmit(ip, startISO, endISO, interval);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            {customError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm mb-4">
                    {customError}
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
                        className={`form-input form-input-icon ${errors.ip ? 'border-red-500' : ''}`}
                        {...register("ip", { required: "IP address is required" })}
                    />
                </div>
                {errors.ip && <p className="text-red-500 text-xs mt-1">{errors.ip.message}</p>}
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
                            className={`form-input form-input-icon !px-2 !pl-9 ${errors.startDate ? 'border-red-500' : ''}`}
                            {...register("startDate", { required: "Start date is required" })}
                        />
                    </div>
                    <div className="input-icon-wrapper">
                        <div className="input-icon-left">
                            <Clock size={16} />
                        </div>
                        <input 
                            type="time"
                            className={`form-input form-input-icon !px-2 !pl-8 ${errors.startTime ? 'border-red-500' : ''}`}
                            {...register("startTime", { required: "Start time is required" })}
                        />
                    </div>
                </div>
                {(errors.startDate || errors.startTime) && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.startDate?.message || errors.startTime?.message}
                    </p>
                )}
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
                            className={`form-input form-input-icon !px-2 !pl-8 ${errors.endDate ? 'border-red-500' : ''}`}
                            {...register("endDate", { required: "End date is required" })}
                        />
                    </div>
                    <div className="input-icon-wrapper">
                        <div className="input-icon-left">
                            <Clock size={16} />
                        </div>
                        <input 
                            type="time"
                            className={`form-input form-input-icon !px-2 !pl-8 ${errors.endTime ? 'border-red-500' : ''}`}
                            {...register("endTime", { required: "End time is required" })}
                        />
                    </div>
                </div>
                {(errors.endDate || errors.endTime) && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.endDate?.message || errors.endTime?.message}
                    </p>
                )}
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
                        className={`form-input form-input-icon ${errors.interval ? 'border-red-500' : ''}`}
                        {...register("interval", { 
                            required: "Interval is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Interval must be a number"
                            }
                        })}
                    />
                </div>
                {errors.interval && <p className="text-red-500 text-xs mt-1">{errors.interval.message}</p>}
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