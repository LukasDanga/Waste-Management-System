import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Report } from './types';

const priorityClasses: Record<string, string> = {
  high: 'border-red-300 bg-red-50',
  medium: 'border-yellow-300 bg-yellow-50',
  low: 'border-gray-200 bg-white',
};

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const priorityClass = priorityClasses[report.priority || 'low'] || 'border-gray-200 bg-white';

  return (
    <div className={`border-2 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${priorityClass}`}>
      <StatusBadge status={report.status} />
      <div className="font-semibold text-gray-900 mt-2 mb-1">{report.reportId}</div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <AlertTriangle className="w-4 h-4 text-orange-600" />
          <span>
            {report.type} - {report.weight}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-green-600" />
          <span>{report.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{report.time}</span>
        </div>
      </div>
      {report.status === 'urgent' && (
        <button className="w-full mt-3 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
          Ưu tiên xử lý
        </button>
      )}
    </div>
  );
}
