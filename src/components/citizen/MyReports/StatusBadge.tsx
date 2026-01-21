interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'assigned' | 'collected';
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'assigned':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'collected':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${getStatusColor()}`}>{label}</span>;
}
