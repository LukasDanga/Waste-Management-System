import { Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import type { EnterpriseStatus } from './types';

interface SearchFilterBarProps {
  searchTerm: string;
  statusFilter: 'all' | EnterpriseStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'all' | EnterpriseStatus) => void;
}

export function SearchFilterBar({ searchTerm, statusFilter, onSearchChange, onStatusChange }: SearchFilterBarProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 rounded-xl p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <Label htmlFor="search">Tìm kiếm doanh nghiệp</Label>
          <div className="relative mt-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="search"
              placeholder="Nhập tên doanh nghiệp"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label>Trạng thái</Label>
          <Select value={statusFilter} onValueChange={(value : any) => onStatusChange(value as 'all' | EnterpriseStatus)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="verified">Đã duyệt</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="suspended">Đình chỉ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
