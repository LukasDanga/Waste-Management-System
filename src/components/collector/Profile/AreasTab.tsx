import { MapPin } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import type { Availability, WorkArea } from './types';

interface AreasTabProps {
  workAreas: WorkArea[];
  availability: Availability;
  onToggleAvailability: (day: keyof Availability) => void;
  onSave: () => void;
}

const days = [
  { key: 'monday', label: 'Thứ Hai' },
  { key: 'tuesday', label: 'Thứ Ba' },
  { key: 'wednesday', label: 'Thứ Tư' },
  { key: 'thursday', label: 'Thứ Năm' },
  { key: 'friday', label: 'Thứ Sáu' },
  { key: 'saturday', label: 'Thứ Bảy' },
  { key: 'sunday', label: 'Chủ Nhật' },
] as const;

export function AreasTab({ workAreas, availability, onToggleAvailability, onSave }: AreasTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Khu vực phụ trách</h3>

      <div className="space-y-4 mb-6">
        {workAreas.map((area) => (
          <div key={area.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">{area.name}</p>
                <p className="text-sm text-gray-500">TP. Hồ Chí Minh</p>
              </div>
            </div>
            <Badge
              variant={area.active ? 'default' : 'secondary'}
              className={area.active ? 'bg-emerald-100 text-emerald-700' : ''}
            >
              {area.active ? 'Đang hoạt động' : 'Không hoạt động'}
            </Badge>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Lịch làm việc trong tuần</h4>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day.key} className="flex items-center justify-between p-3 border rounded-lg">
              <p className="font-medium text-gray-900">{day.label}</p>
              <Switch
                checked={availability[day.key]}
                onCheckedChange={() => onToggleAvailability(day.key)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onSave}>
          Lưu cấu hình
        </Button>
      </div>
    </div>
  );
}
