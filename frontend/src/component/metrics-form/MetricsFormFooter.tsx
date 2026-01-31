import type { ReactNode } from 'react';

interface MetricsFormFooterProps {
    children: ReactNode;
    className?: string;
}

export default function MetricsFormFooter({ children, className = '' }: MetricsFormFooterProps) {
    return (
        <div className={`flex flex-col md:flex-row gap-4 items-center justify-end pt-6 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
}
