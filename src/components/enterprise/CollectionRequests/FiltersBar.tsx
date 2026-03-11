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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm..." className="pl-9 bg-input-background" />
        </div>

        <Select value={filters.area} onValueChange={(value: any) => onChange('area', value)}>
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Khu vực (regionCode)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khu vực</SelectItem>
            <SelectItem value="HCM-Q1">Quận 1</SelectItem>
            <SelectItem value="HCM-Q3">Quận 3</SelectItem>
            <SelectItem value="HCM-Q5">Quận 5</SelectItem>
            <SelectItem value="HCM-Q7">Quận 7</SelectItem>
            <SelectItem value="HCM-BT">Bình Thạnh</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value: any) => onChange('type', value)}>
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Loại rác" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            <SelectItem value="ORGANIC">🌿 Hữu cơ</SelectItem>
            <SelectItem value="RECYCLABLE">♻️ Tái chế</SelectItem>
            <SelectItem value="ELECTRONIC">⚡ Điện tử</SelectItem>
            <SelectItem value="HAZARDOUS">☢️ Nguy hại</SelectItem>
            <SelectItem value="GENERAL">🗑️ Thông thường</SelectItem>
            <SelectItem value="CONSTRUCTION">🧱 Xây dựng</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
