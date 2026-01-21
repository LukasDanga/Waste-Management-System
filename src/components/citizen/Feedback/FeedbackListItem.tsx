import { ChevronRight } from 'lucide-react';
import { Card } from '../../ui/card';
import type { FeedbackItem } from './types';
import { FeedbackStatusBadge } from './FeedbackStatusBadge';

interface FeedbackListItemProps {
  item: FeedbackItem;
}

export function FeedbackListItem({ item }: FeedbackListItemProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{item.typeLabel}</span>
            <span className="font-mono text-sm text-gray-500">{item.id}</span>
          </div>
          <h3 className="font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600">Ngày gửi: {item.date}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <FeedbackStatusBadge status={item.status} label={item.statusLabel} />
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {item.response && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-semibold text-green-800 mb-1">Phản hồi từ quản trị viên:</p>
          <p className="text-sm text-gray-700">{item.response}</p>
        </div>
      )}
    </Card>
  );
}
