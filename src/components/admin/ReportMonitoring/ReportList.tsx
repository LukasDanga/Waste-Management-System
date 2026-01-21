import type { Report } from './types';
import { ReportCard } from './ReportCard';

interface ReportListProps {
  reports: Report[];
}

export function ReportList({ reports }: ReportListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách báo cáo ({reports.length})</h2>
      <div className="space-y-3 max-h-[800px] overflow-y-auto">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
