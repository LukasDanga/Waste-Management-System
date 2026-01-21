import { AlertTriangle, Clock } from 'lucide-react';

interface AlertsPanelProps {
  urgentCount: number;
  overdueCount: number;
  rejectedCount: number;
}

export function AlertsPanel({ urgentCount, overdueCount, rejectedCount }: AlertsPanelProps) {
  if (!urgentCount && !overdueCount && !rejectedCount) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {urgentCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-900">Báo cáo khẩn cấp</span>
          </div>
          <p className="text-sm text-red-700">{urgentCount} báo cáo cần xử lý ngay</p>
        </div>
      )}
      {overdueCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-900">Báo cáo quá hạn</span>
          </div>
          <p className="text-sm text-orange-700">{overdueCount} báo cáo chưa xử lý</p>
        </div>
      )}
      {rejectedCount > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Báo cáo bị từ chối</span>
          </div>
          <p className="text-sm text-gray-700">{rejectedCount} báo cáo cần xem lại</p>
        </div>
      )}
    </div>
  );
}
