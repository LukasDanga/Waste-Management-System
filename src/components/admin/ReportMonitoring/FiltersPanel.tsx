import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface FiltersPanelProps {
  areaFilter: string;
  typeFilter: string;
  statusFilter: string;
  onAreaChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function FiltersPanel({ areaFilter, typeFilter, statusFilter, onAreaChange, onTypeChange, onStatusChange }: FiltersPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Bộ lọc</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực</label>
          <Select value={areaFilter} onValueChange={onAreaChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Q1">Quận 1</SelectItem>
              <SelectItem value="Q3">Quận 3</SelectItem>
              <SelectItem value="Q5">Quận 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loại rác</label>
          <Select value={typeFilter} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Rác tái chế">Rác tái chế</SelectItem>
              <SelectItem value="Rác hữu cơ">Rác hữu cơ</SelectItem>
              <SelectItem value="Rác nguy hại">Rác nguy hại</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="urgent">Khẩn cấp</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="assigned">Đã phân công</SelectItem>
              <SelectItem value="in-progress">Đang xử lý</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
