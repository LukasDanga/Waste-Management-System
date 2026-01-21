import { Filter, Search } from 'lucide-react';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import type { ReportFilters } from './types';

interface FiltersPanelProps {
  filters: ReportFilters;
  onChange: (next: ReportFilters) => void;
}

export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const update = (key: keyof ReportFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold">Bộ lọc</h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Tìm kiếm..." className="pl-9 bg-input-background" />
          </div>
        </div>

        <div>
          <Select value={filters.status} onValueChange={(value : any) => update('status', value)}>
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">🟡 Chờ xử lý</SelectItem>
              <SelectItem value="accepted">🟢 Đã chấp nhận</SelectItem>
              <SelectItem value="assigned">🔵 Đang thu</SelectItem>
              <SelectItem value="collected">✅ Hoàn thành</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={filters.type} onValueChange={(value : any) => update('type', value)}>
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Loại rác" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="organic">🌿 Hữu cơ</SelectItem>
              <SelectItem value="recyclable">♻️ Tái chế</SelectItem>
              <SelectItem value="hazardous">⚠️ Nguy hại</SelectItem>
              <SelectItem value="general">🗑️ Thông thường</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={filters.time} onValueChange={(value : any ) => update('time', value)}>
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 ngày gần đây</SelectItem>
              <SelectItem value="30">30 ngày gần đây</SelectItem>
              <SelectItem value="90">90 ngày gần đây</SelectItem>
              <SelectItem value="custom">Tùy chỉnh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
