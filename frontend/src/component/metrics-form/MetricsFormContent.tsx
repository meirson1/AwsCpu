import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Network, Calendar, Clock } from 'lucide-react';
import FormInput from '../FormInput';

export interface FormInputs {
    ip: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    interval: string;
}

interface MetricsFormContentProps {
    register: UseFormRegister<FormInputs>;
    errors: FieldErrors<FormInputs>;
}

export default function MetricsFormContent({ register, errors }: MetricsFormContentProps) {
    return (
        <>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
        </>
    );
}
