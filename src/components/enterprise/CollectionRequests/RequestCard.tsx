import { Info } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import type { RequestItem } from './types';

interface RequestCardProps {
  request: RequestItem;
  onNavigate: () => void;
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  pending: { label: '⏳ Chờ phân công', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  accepted: { label: '👷 Đã phân công', className: 'bg-blue-100 text-blue-700 border-blue-300' },
  rejected: { label: '❌ Từ chối', className: 'bg-red-100 text-red-700 border-red-300' },
};

export function RequestCard({ request, onNavigate }: RequestCardProps) {
  const badge = STATUS_BADGE[request.status] ?? STATUS_BADGE.pending;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <img
          src={request.image}
          alt={request.typeLabel}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/96x96?text=N/A'; }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg">{request.id}</h3>
            <Badge className={`whitespace-nowrap ${badge.className}`}>{badge.label}</Badge>
          </div>

          <div className="space-y-1 text-sm mb-3">
            <p className="text-gray-600">📍 {request.regionCode || 'Chưa xác định khu vực'}</p>
            <p>{request.typeLabel}</p>
            {request.description && (
              <p className="text-gray-500 text-xs truncate">{request.description}</p>
            )}
            <p className="text-gray-500">⏰ {request.timeAgo}</p>
            <p className="text-gray-500 text-xs">👤 {request.reporter}</p>
          </div>

          {request.status === 'pending' && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onNavigate}>
              Phân công Collector
            </Button>
          )}

          {request.status !== 'pending' && (
            <Button className="border border-gray-300 hover:bg-gray-50" onClick={onNavigate}>
              <Info className="h-4 w-4 mr-1" />
              Xem chi tiết
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
