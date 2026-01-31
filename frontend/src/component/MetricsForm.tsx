import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMetricsStore } from "../store/useMetricsStore";
import MetricsFormHeader from "./metrics-form/MetricsFormHeader";
import MetricsFormContent from "./metrics-form/MetricsFormContent";
import type { FormInputs } from "./metrics-form/MetricsFormContent";
import MetricsFormFooter from "./metrics-form/MetricsFormFooter";

export default function MetricsForm() {
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
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            <MetricsFormHeader customError={customError} />
            <MetricsFormContent register={register} errors={errors} />
            <MetricsFormFooter register={register} errors={errors} />
        </form>
    );
}
