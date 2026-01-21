import { Card } from '../../ui/card';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { ReportItem } from './types';

interface ReportCardProps {
  report: ReportItem;
  onClick: () => void;
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img src={report.image} alt={report.typeLabel} className="w-24 h-24 object-cover rounded-lg" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg">{report.id}</h3>
            <StatusBadge status={report.status} label={report.statusLabel} />
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-gray-600">📍 {report.location}</p>
            <p>{report.typeLabel}</p>
            <div className="flex items-center gap-4 text-gray-500">
              <span>⭐ {report.points} điểm</span>
              <span>🕐 {report.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </Card>
  );
}
