import { Filter, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Card } from '../../ui/card';
import type { FiltersState } from './types';

interface FiltersBarProps {
  filters: FiltersState;
  onChange: (key: keyof FiltersState, value: string) => void;
}

export function FiltersBar({ filters, onChange }: FiltersBarProps) {
  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold">Bộ lọc</h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm..." className="pl-9 bg-input-background" />
        </div>

        <Select value={filters.area} onValueChange={(value : any) => onChange('area', value)}>
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Khu vực" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khu vực</SelectItem>
            <SelectItem value="q1">Quận 1</SelectItem>
            <SelectItem value="q3">Quận 3</SelectItem>
            <SelectItem value="q5">Quận 5</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value : any) => onChange('type', value)}>
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Loại rác" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            <SelectItem value="organic">🌿 Hữu cơ</SelectItem>
            <SelectItem value="recyclable">♻️ Tái chế</SelectItem>
            <SelectItem value="general">🗑️ Thông thường</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.weight} onValueChange={(value : any) => onChange('weight', value)}>
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Khối lượng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="small">Nhỏ (&lt;5kg)</SelectItem>
            <SelectItem value="medium">Trung bình (5-20kg)</SelectItem>
            <SelectItem value="large">Lớn (&gt;20kg)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
