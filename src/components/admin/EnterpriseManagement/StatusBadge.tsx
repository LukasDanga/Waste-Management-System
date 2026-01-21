import { Badge } from '../../ui/badge';
import type { EnterpriseStatus } from './types';

export function StatusBadge({ status }: { status: EnterpriseStatus }) {
  if (status === 'verified') {
    return <Badge className="bg-green-100 text-green-700 border-green-200">✅ Đã xác minh</Badge>;
  }
  if (status === 'pending') {
    return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">⏳ Chờ duyệt</Badge>;
  }
  if (status === 'suspended') {
    return <Badge className="bg-red-100 text-red-700 border-red-200">🚫 Đình chỉ</Badge>;
  }
  return null;
}
