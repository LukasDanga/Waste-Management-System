import { CheckCircle, Info, Target, XCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import type { RequestItem } from './types';

interface RequestCardProps {
  request: RequestItem;
  showActions?: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onNavigate: (section: string, data?: any) => void;
}

export function RequestCard({ request, showActions = true, onAccept, onReject, onNavigate }: RequestCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Image */}
        <img
          src={request.image}
          alt={request.typeLabel}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg">{request.id}</h3>
            {request.priority === 'high' && request.aiReason && (
              <Badge className="bg-orange-100 text-orange-700 border-orange-300 whitespace-nowrap">
                <Target className="h-3 w-3 mr-1" />
                Ưu tiên cao
              </Badge>
            )}
          </div>

          <div className="space-y-1 text-sm mb-3">
            <p className="text-gray-600">📍 {request.location}</p>
            <p>
              <span className="mr-2">{request.typeLabel}</span>
              <span className="text-gray-600">- {request.weight}</span>
            </p>
            <p className="text-gray-500">⏰ {request.timeAgo}</p>
            {request.aiReason && <p className="text-xs text-orange-600">🎯 {request.aiReason}</p>}
            {request.collector && <p className="text-xs text-blue-600">👷 Đã phân công: {request.collector}</p>}
            {request.completedTime && <p className="text-xs text-green-600">✅ Hoàn thành: {request.completedTime}</p>}
          </div>

          {/* Actions */}
          {showActions && request.status === 'pending' && (
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => onAccept(request.id)}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Chấp nhận
              </Button>
              <Button
                className="text-red-600 border border-red-300 hover:bg-red-50"
                onClick={() => onReject(request.id)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Từ chối
              </Button>
              <Button className="border border-gray-300 hover:bg-gray-50" onClick={() => onNavigate('request-detail', request)}>
                <Info className="h-4 w-4 mr-1" />
                Chi tiết
              </Button>
            </div>
          )}

          {request.status === 'accepted' && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('request-detail', request)}>
              Phân công Collector
            </Button>
          )}

          {(request.status === 'assigned' || request.status === 'completed') && (
            <Button className="border border-gray-300 hover:bg-gray-50" onClick={() => onNavigate('request-detail', request)}>
              <Info className="h-4 w-4 mr-1" />
              Xem chi tiết
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
