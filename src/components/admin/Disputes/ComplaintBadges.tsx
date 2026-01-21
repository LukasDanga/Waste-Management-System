import { Badge } from '../../ui/badge';
import type { ComplaintSeverity, ComplaintStatus } from './types';

export function SeverityBadge({ severity }: { severity: ComplaintSeverity }) {
  switch (severity) {
    case 'high':
      return <Badge className="bg-red-100 text-red-700 border-red-200">🔴 Cao</Badge>;
    case 'medium':
      return <Badge className="bg-orange-100 text-orange-700 border-orange-200">🟠 Trung bình</Badge>;
    case 'low':
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">🟡 Thấp</Badge>;
    default:
      return null;
  }
}

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  switch (status) {
    case 'new':
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">🆕 Mới</Badge>;
    case 'in-progress':
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">🔄 Đang xử lý</Badge>;
    case 'resolved':
      return <Badge className="bg-green-100 text-green-700 border-green-200">✅ Đã giải quyết</Badge>;
    case 'closed':
      return <Badge className="bg-gray-100 text-gray-700 border-gray-200">❌ Đóng</Badge>;
    default:
      return null;
  }
}
