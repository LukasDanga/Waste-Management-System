import { AlertCircle } from 'lucide-react';
import { Card } from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import { Progress } from '../../ui/progress';
import type { WasteType } from './types';

interface WasteTypesSectionProps {
  wasteTypes: WasteType[];
}

const usageColor = (percent: number) => {
  if (percent > 80) return 'text-red-600';
  if (percent > 60) return 'text-yellow-600';
  return 'text-green-600';
};

export function WasteTypesSection({ wasteTypes }: WasteTypesSectionProps) {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Loại rác được phép thu gom</h2>

      <div className="space-y-6">
        {wasteTypes.map((waste) => {
          const percent = waste.capacity > 0 ? (waste.currentUsage / waste.capacity) * 100 : 0;
          return (
            <div key={waste.type} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={waste.registered} disabled={!waste.registered} />
                  <span className="font-semibold">{waste.label}</span>
                </div>
                {waste.registered ? (
                  <span className="text-sm font-semibold">
                    {waste.capacity} {waste.unit}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Chưa đăng ký</span>
                )}
              </div>

              {waste.registered && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      Đã sử dụng: {waste.currentUsage}/{waste.capacity} tấn
                    </span>
                    <span className={`font-semibold ${usageColor(percent)}`}>
                      {Math.round(percent)}%
                    </span>
                  </div>
                  <Progress value={percent} className="h-3" />
                  {percent > 80 && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Sắp đạt giới hạn năng lực!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-gray-700">
          💡 <strong>Lưu ý:</strong> Để đăng ký xử lý thêm loại rác, vui lòng nộp hồ sơ theo quy định của Sở Tài nguyên & Môi trường.
        </p>
      </div>
    </Card>
  );
}
