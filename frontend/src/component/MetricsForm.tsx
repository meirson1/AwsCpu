import { useForm } from "react-hook-form";
import { useState } from "react";
import { Search } from "lucide-react";
import { useMetricsStore } from "../store/useMetricsStore";
import MetricsFormHeader from "./metrics-form/MetricsFormHeader";
import MetricsFormContent from "./metrics-form/MetricsFormContent";
import type { FormInputs } from "./metrics-form/MetricsFormContent";
import MetricsFormFooter from "./metrics-form/MetricsFormFooter";
import Button from "./Button";


interface MetricsFormProps {
    className?: string;
}

export default function MetricsForm({ className = "" }: MetricsFormProps) {
    const { fetchMetrics } = useMetricsStore();
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

        fetchMetrics(ip, startISO, endISO, interval);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={`bg-white p-6 rounded-lg shadow-sm h-full flex flex-col ${className}`}>
            <MetricsFormHeader 
                title="Search Parameters"
            >
                {customError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                        {customError}
                    </div>
                )}
            </MetricsFormHeader>

            <div className="flex-1 space-y-5">
            <MetricsFormContent register={register} errors={errors} />
            </div>
            
            <MetricsFormFooter>
                <Button 
                    type="submit" 
                    icon={Search}
                    className="w-full md:w-auto min-w-[200px]"
                >
                    Search Metrics
                </Button>
            </MetricsFormFooter>
        </form>
    );
}
