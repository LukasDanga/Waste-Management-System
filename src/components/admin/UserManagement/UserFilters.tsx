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
      searchPlaceholder="Tìm theo họ tên hoặc email..."
      searchValue={searchQuery}
      onSearchChange={onSearchChange}
      statusLabel="Trạng thái"
      statusValue={statusFilter}
      statusOptions={[
        { value: 'all', label: 'Tất cả' },
        { value: 'active', label: 'Đang hoạt động' },
        { value: 'inactive', label: 'Ngưng hoạt động' },
      ]}
      onStatusChange={onStatusChange}
    />
  );
}
