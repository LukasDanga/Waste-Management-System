import { Filters } from '../../shared/Filters';

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function UserFilters({ searchQuery, onSearchChange, statusFilter, onStatusChange }: UserFiltersProps) {
  return (
    <Filters
      searchLabel="Tìm kiếm"
      searchPlaceholder="Tìm theo tên, email, số điện thoại..."
      searchValue={searchQuery}
      onSearchChange={onSearchChange}
      statusLabel="Trạng thái"
      statusValue={statusFilter}
      statusOptions={[
        { value: 'all', label: 'Tất cả' },
        { value: 'active', label: 'Hoạt động' },
        { value: 'suspended', label: 'Tạm khóa' },
        { value: 'deleted', label: 'Đã xóa' },
      ]}
      onStatusChange={onStatusChange}
    />
  );
}
