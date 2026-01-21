import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import type { RecentReport } from './types';

interface RecentReportsProps {
  reports: RecentReport[];
  onSeeAll: () => void;
}

export function RecentReports({ reports, onSeeAll }: RecentReportsProps) {
  const getStatusClass = (status: RecentReport['status']) => {
    if (status === 'collected') return 'bg-green-100 text-green-700';
    if (status === 'assigned') return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Báo cáo gần đây</h2>
        <Button className="text-green-600" onClick={onSeeAll}>
          Xem tất cả →
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex gap-4">
              <img src={report.image} alt={report.type} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{report.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${getStatusClass(report.status)}`}>
                    {report.statusText}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">📍 {report.location}</p>
                <p className="text-sm mb-1">{report.type}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>⭐ {report.points} điểm</span>
                  <span>🕐 {report.date}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
