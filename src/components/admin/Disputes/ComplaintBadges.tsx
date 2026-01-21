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

const STATUS_PRESETS: Record<ComplaintStatus, { label: string; className: string; icon: string }> = {
  new: {
    label: 'Chờ',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: '🆕',
  },
  'in-progress': {
    label: 'Đang xử lý',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: '🔄',
  },
  resolved: {
    label: 'Đã giải quyết',
    className: 'bg-green-100 text-green-700 border-green-200',
    icon: '✅',
  },
  closed: {
    label: 'Đã đóng',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: '❌',
  },
};

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  const preset = STATUS_PRESETS[status];
  if (!preset) return null;

  return <Badge className={preset.className}>{preset.icon} {preset.label}</Badge>;
}
