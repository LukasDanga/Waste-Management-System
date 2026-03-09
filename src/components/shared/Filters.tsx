import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface StatusOption {
  value: string;
  label: string;
}

interface FiltersProps {
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusLabel?: string;
  statusValue?: string;
  statusOptions?: StatusOption[];
  onStatusChange?: (value: string) => void;
  className?: string;
}

export function Filters({
  searchLabel = 'Tìm kiếm',
  searchPlaceholder = 'Nhập từ khóa...',
  searchValue,
  onSearchChange,
  statusLabel = 'Trạng thái',
  statusValue,
  statusOptions,
  onStatusChange,
  className,
}: FiltersProps) {
  const showStatus = statusOptions && statusOptions.length > 0 && onStatusChange;

  return (
    <div
      className={
        ['bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6', className]
          .filter(Boolean)
          .join(' ')
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={showStatus ? 'md:col-span-2' : 'md:col-span-3'}>
          <Label className="mb-2 block text-sm font-medium">{searchLabel}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {showStatus && (
          <div>
            <Label className="mb-2 block text-sm font-medium">{statusLabel}</Label>
            <Select value={statusValue} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
