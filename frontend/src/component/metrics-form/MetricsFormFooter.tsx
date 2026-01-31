import { Search, Clock } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { FormInputs } from './MetricsFormContent';
import FormInput from '../FormInput';

interface MetricsFormFooterProps {
    register: UseFormRegister<FormInputs>;
    errors: FieldErrors<FormInputs>;
}

export default function MetricsFormFooter({ register, errors }: MetricsFormFooterProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-end pt-4">
            <FormInput
                label="Interval (seconds)"
                id="interval"
                placeholder="60"
                icon={Clock}
                containerClassName="w-full md:w-1/3 !mb-0"
                registration={register("interval", { 
                    required: "Interval is required",
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "Interval must be a number"
                    }
                })}
                error={errors.interval}
            />
            <button type="submit" className="btn-primary w-full md:w-2/3 h-[42px] flex items-center justify-center gap-2">
                <Search size={18} />
                Search Metrics
            </button>
        </div>
    );
}
