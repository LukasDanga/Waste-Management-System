import { Badge } from '../../ui/badge';
import type { ReportStatus } from './types';

export function StatusBadge({ status }: { status: ReportStatus }) {
  if (status === 'urgent') return <Badge className="bg-red-100 text-red-700 border-red-200">🔴 KHẨN CẤP</Badge>;
  if (status === 'pending') return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">🟡 Chờ xử lý</Badge>;
  if (status === 'assigned') return <Badge className="bg-blue-100 text-blue-700 border-blue-200">🔵 Đã phân công</Badge>;
  if (status === 'in-progress') return <Badge className="bg-green-100 text-green-700 border-green-200">🟢 Đang xử lý</Badge>;
  if (status === 'completed') return <Badge className="bg-green-100 text-green-700 border-green-200">✅ Hoàn thành</Badge>;
  if (status === 'rejected') return <Badge className="bg-gray-100 text-gray-700 border-gray-200">❌ Từ chối</Badge>;
  return null;
}
