import { Phone, Mail, FileText, MapPin, Users, CheckCircle, Ban, Edit, Eye, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import type { Enterprise } from './types';
import { StatusBadge } from './StatusBadge';

interface EnterpriseCardProps {
  enterprise: Enterprise;
  onView: (enterprise: Enterprise) => void;
  onEdit: (enterprise: Enterprise) => void;
  onSuspend: (enterprise: Enterprise) => void;
  onActivate: (enterprise: Enterprise) => void;
  onApprove?: (enterprise: Enterprise) => void;
  onReject?: (enterprise: Enterprise) => void;
}

export function EnterpriseCard({ enterprise, onView, onEdit, onSuspend, onActivate, onApprove, onReject }: EnterpriseCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🏢</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">{enterprise.name}</h3>
            <StatusBadge status={enterprise.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-green-600" />
          <span>{enterprise.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-green-600" />
          <span>{enterprise.email}</span>
        </div>
        {enterprise.address && (
          <div className="flex items-center gap-2 text-sm text-gray-600 md:col-span-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span>{enterprise.address}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="font-medium">Giấy phép:</span>
          </div>
          <div className="text-sm text-gray-900">{enterprise.license}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="font-medium">Khu vực:</span>
          </div>
          <div className="text-sm text-gray-900">{enterprise.areas.join(', ')}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Users className="w-4 h-4 text-green-600" />
            <span className="font-medium">Collector:</span>
          </div>
          <div className="text-sm text-gray-900">{enterprise.collectors} người</div>
        </div>
        {enterprise.registrationDate && (
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="font-medium">Ngày đăng ký:</span>
            </div>
            <div className="text-sm text-gray-900">{enterprise.registrationDate}</div>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <Button className="flex items-center gap-2 text-sm" onClick={() => onView(enterprise)}>
          <Eye className="w-4 h-4" />
          Chi tiết
        </Button>
        <Button className="flex items-center gap-2 text-sm" onClick={() => onEdit(enterprise)}>
          <Edit className="w-4 h-4" />
          Chỉnh sửa
        </Button>
        {enterprise.status === 'verified' && (
          <Button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700" onClick={() => onSuspend(enterprise)}>
            <Ban className="w-4 h-4" />
            Đình chỉ
          </Button>
        )}
        {enterprise.status === 'pending' && (
          <>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-sm" onClick={() => (onApprove ? onApprove(enterprise) : onActivate(enterprise))}>
              <CheckCircle className="w-4 h-4" />
              Phê duyệt
            </Button>
            <Button className="text-red-600 hover:text-red-700 text-sm" onClick={() => onReject && onReject(enterprise)}>
              Từ chối
            </Button>
          </>
        )}
        {enterprise.status === 'suspended' && (
          <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-sm" onClick={() => onActivate(enterprise)}>
            <CheckCircle className="w-4 h-4" />
            Kích hoạt lại
          </Button>
        )}
      </div>
    </div>
  );
}
