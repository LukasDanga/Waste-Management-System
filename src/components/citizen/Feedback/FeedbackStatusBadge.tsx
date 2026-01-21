import type { FeedbackStatus } from './types';

interface FeedbackStatusBadgeProps {
  status: FeedbackStatus;
  label: string;
}

export function FeedbackStatusBadge({ status, label }: FeedbackStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor()}`}>{label}</span>;
}
