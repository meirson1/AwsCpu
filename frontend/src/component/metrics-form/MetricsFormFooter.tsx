import { Search } from 'lucide-react';

export default function MetricsFormFooter() {
    return (
        <div className="pt-4">
            <button type="submit" className="btn-primary">
                <Search size={18} />
                Search Metrics
            </button>
        </div>
    );
}
