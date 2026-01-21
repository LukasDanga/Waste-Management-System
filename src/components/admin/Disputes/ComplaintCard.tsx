import { AlertTriangle, Building2, Clock, User } from 'lucide-react';
import { Button } from '../../ui/button';
import { SeverityBadge, StatusBadge } from './ComplaintBadges';
import type { Complaint } from './types';

interface ComplaintCardProps {
  complaint: Complaint;
  onSelect: (complaint: Complaint) => void;
}

export function ComplaintCard({ complaint, onSelect }: ComplaintCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-colors cursor-pointer"
      onClick={() => onSelect(complaint)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Khiếu nại {complaint.complaintId}</div>
            <SeverityBadge severity={complaint.severity} />
          </div>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Người gửi</div>
          <div className="flex items-center gap-2 text-sm">
            {complaint.sender.role === 'Citizen' ? (
              <User className="w-4 h-4 text-blue-600" />
            ) : (
              <Building2 className="w-4 h-4 text-green-600" />
            )}
            <span className="font-medium">{complaint.sender.name}</span>
            <span className="text-gray-500">({complaint.sender.role})</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Liên quan đến</div>
          <div className="text-sm font-medium text-green-600">{complaint.relatedTo}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Đối tượng</div>
          <div className="text-sm font-medium">{complaint.against}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Ngày tạo</div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            {complaint.createdAt}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-2">Vấn đề:</div>
        <div className="font-medium text-gray-900">{complaint.issue}</div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          className="flex-1 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => onSelect(complaint)}
        >
          Xem chi tiết
        </Button>
        {(complaint.status === 'new' || complaint.status === 'in-progress') && (
          <Button className="bg-green-600 hover:bg-green-700 flex-1" onClick={() => onSelect(complaint)}>
            Xử lý
          </Button>
        )}
      </div>
    </div>
  );
}
