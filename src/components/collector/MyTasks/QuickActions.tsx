import { Map } from 'lucide-react';

interface QuickActionsProps {
  sortBy: 'distance' | 'time';
  onSortChange: (value: 'distance' | 'time') => void;
  onViewMap?: () => void;
}

export function QuickActions({ sortBy, onSortChange, onViewMap }: QuickActionsProps) {
  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => onSortChange('distance')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          sortBy === 'distance'
            ? 'bg-green-600 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        Sắp xếp theo khoảng cách
      </button>
      <button
        onClick={onViewMap}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <Map className="w-4 h-4" />
        Xem trên bản đồ
      </button>
    </div>
  );
}
