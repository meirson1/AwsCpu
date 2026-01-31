import type { LucideIcon } from 'lucide-react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon: LucideIcon;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    containerClassName?: string;
}

export default function FormInput({
    label,
    icon: Icon,
    registration,
    error,
    className = "",
    containerClassName = "",
    ...props
}: FormInputProps) {
    return (
        <div className={`form-group ${containerClassName}`}>
            {label && <label htmlFor={props.id || registration.name} className="form-label">{label}</label>}
            <div className="input-icon-wrapper">
                <div className="input-icon-left">
                    <Icon size={18} />
                </div>
                <input
                    {...registration}
                    {...props}
                    id={props.id || registration.name}
                    className={`form-input form-input-icon ${error ? 'border-red-500' : ''} ${className}`}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
}
