import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import type { CitizenArea } from '@/services/citizenService';

export interface AreaSelectorProps {
  areas: CitizenArea[];
  value: string;
  onValueChange: (citizenAreaID: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function AreaSelector({
  areas,
  value,
  onValueChange,
  disabled = false,
  placeholder = 'Chọn khu vực',
}: AreaSelectorProps) {
  return (
    <Select
      value={value || undefined}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full max-w-xs bg-white dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 focus-visible:ring-emerald-500">
        <MapPin className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {areas.map((area) => (
          <SelectItem key={area.citizenAreaID} value={area.citizenAreaID}>
            {area.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
