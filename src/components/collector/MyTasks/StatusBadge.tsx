import type { TaskStatus } from './types';

const badgeStyles: Record<TaskStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  'on-the-way': 'bg-blue-100 text-blue-700 border border-blue-200',
  completed: 'bg-green-100 text-green-700 border border-green-200',
};

const badgeLabels: Record<TaskStatus, string> = {
  pending: '🟡 Chưa bắt đầu',
  'on-the-way': '🔵 Đang đến',
  completed: '✅ Hoàn thành',
};

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badgeStyles[status]}`}>
      {badgeLabels[status]}
    </span>
  );
}
