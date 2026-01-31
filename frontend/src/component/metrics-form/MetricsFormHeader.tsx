
import type { ReactNode } from 'react';

interface MetricsFormHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export default function MetricsFormHeader({ title, description, children }: MetricsFormHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
}
