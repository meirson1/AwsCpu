import { useForm } from "react-hook-form";
import { Network, Calendar, Search, Clock } from 'lucide-react';
import { useState } from "react";
import FormInput from "./FormInput";

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
            
            <FormInput
                label="IP Address"
                id="ip"
                placeholder="172.31.88.161"
                icon={Network}
                registration={register("ip", { required: "IP address is required" })}
                error={errors.ip}
            />

            <div className="form-group">
                <label className="form-label">Start Period</label>
                <div className="grid grid-cols-2 gap-2">
                    <FormInput
                        type="date"
                        icon={Calendar}
                        className="!px-2 !pl-9"
                        registration={register("startDate", { required: "Start date is required" })}
                        error={errors.startDate}
                    />
                    <FormInput
                        type="time"
                        icon={Clock}
                        className="!px-2 !pl-8"
                        registration={register("startTime", { required: "Start time is required" })}
                        error={errors.startTime}
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">End Period</label>
                <div className="grid grid-cols-2 gap-2">
                    <FormInput
                        type="date"
                        icon={Calendar}
                        className="!px-2 !pl-9"
                        registration={register("endDate", { required: "End date is required" })}
                        error={errors.endDate}
                    />
                    <FormInput
                        type="time"
                        icon={Clock}
                        className="!px-2 !pl-8"
                        registration={register("endTime", { required: "End time is required" })}
                        error={errors.endTime}
                    />
                </div>
            </div>

            <FormInput
                label="Interval (seconds)"
                id="interval"
                placeholder="60"
                icon={Clock}
                registration={register("interval", { 
                    required: "Interval is required",
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "Interval must be a number"
                    }
                })}
                error={errors.interval}
            />

            <div className="pt-4">
                <button type="submit" className="btn-primary">
                    <Search size={18} />
                    Search Metrics
                </button>
            </div>
        </form>
    );
}
