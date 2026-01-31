import type { ReactNode } from 'react';

interface FormFooterProps {
    children: ReactNode;
    className?: string;
}

export default function FormFooter({ children, className = '' }: FormFooterProps) {
    return (
        <div className={`flex flex-col md:flex-row gap-4 items-center justify-end pt-6 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
}
