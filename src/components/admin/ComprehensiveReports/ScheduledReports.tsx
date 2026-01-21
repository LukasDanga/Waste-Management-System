import { Calendar, Download, FileText } from 'lucide-react';
import { Button } from '../../ui/button';
import type { ScheduledReport } from './types';

interface ScheduledReportsProps {
  reports: ScheduledReport[];
  onEdit?: (report: ScheduledReport) => void;
  onDownload?: (report: ScheduledReport) => void;
  onCreateSchedule?: () => void;
}

export function ScheduledReports({ reports, onEdit, onDownload, onCreateSchedule }: ScheduledReportsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Báo cáo định kỳ</h2>
        <Button
          onClick={onCreateSchedule}
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Calendar className="w-4 h-4" />
          Tạo lịch mới
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{report.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Chạy lần cuối: {report.lastRun}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEdit?.(report)}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Chỉnh sửa
                </Button>
                <Button
                  onClick={() => onDownload?.(report)}
                  className="inline-flex items-center rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Người nhận:</span> {report.recipients}
            </div>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Chưa có báo cáo định kỳ nào</p>
        </div>
      )}
    </div>
  );
}
