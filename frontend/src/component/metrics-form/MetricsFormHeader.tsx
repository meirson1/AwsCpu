

interface MetricsFormHeaderProps {
    customError: string | null;
}

export default function MetricsFormHeader({ customError }: MetricsFormHeaderProps) {
    if (!customError) return null;
    
    return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm mb-4">
            {customError}
        </div>
    );
}
