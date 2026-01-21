import { Calendar, CheckCircle2, Clock, MapPin, Star, XCircle } from 'lucide-react';
import type { HistoryItem } from './types';

interface HistoryCardProps {
  item: HistoryItem;
  onNavigate: (page: string, taskId?: string) => void;
}

export function HistoryCard({ item, onNavigate }: HistoryCardProps) {
  const statusBadge =
    item.status === 'completed' ? (
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-medium">
        ✅ Hoàn thành
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-medium">
        ❌ Đã hủy
      </span>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {item.status === 'completed' ? (
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 mb-1">{item.reportId}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {item.date} {item.time}
              </span>
            </div>
          </div>
        </div>
        {statusBadge}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-green-600" />
          <span>{item.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-green-600">♻️</span>
          <span>
            {item.type} - {item.weight}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-green-600" />
          <span>Thời gian: {item.duration}</span>
        </div>
        {item.rating && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{item.rating} sao</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onNavigate('task-detail', item.id)}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        Xem chi tiết
      </button>
    </div>
  );
}
