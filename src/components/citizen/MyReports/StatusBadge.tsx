interface StatusBadgeProps {
  status: number;
  label?: string;
}

const STATUS_STYLES: Record<number, { label: string; className: string }> = {
  0: { label: 'Mới tạo', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  1: { label: 'Đang xử lý', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  2: { label: 'Đã thu gom', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  3: { label: 'Đã đóng', className: 'bg-gray-100 text-gray-700 border-gray-200' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const info = STATUS_STYLES[status] || {
    label: `Trạng thái ${status}`,
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${info.className}`}>
      {label || info.label}
    </span>
  );
}
