import { MapPin } from 'lucide-react';
import { Card } from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import type { ServiceArea } from './types';

interface ServiceAreasSectionProps {
  serviceAreas: ServiceArea[];
}

const markerPositions = [
  'top-10 left-12',
  'top-12 right-14',
  'bottom-16 left-20',
  'bottom-10 right-16',
  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
];

export function ServiceAreasSection({ serviceAreas }: ServiceAreasSectionProps) {
  const selected = serviceAreas.filter((area) => area.checked);

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MapPin className="h-6 w-6" />
        Khu vực hoạt động
      </h2>

      <div className="relative h-64 rounded-xl border border-blue-100 bg-gradient-to-br from-sky-50 via-white to-slate-50 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#dbeafe_1px,transparent_0)] bg-[length:24px_24px] opacity-60" />
        <div className="absolute inset-4 rounded-xl border border-dashed border-blue-200" />
        {selected.slice(0, markerPositions.length).map((area, idx) => (
          <div
            key={area.id}
            className={`absolute ${markerPositions[idx]} z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm border border-blue-100`}
          >
            <span className="text-blue-600">📍</span>
            <span className="text-sm font-semibold text-gray-800">{area.label}</span>
          </div>
        ))}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-sm text-blue-900 font-medium">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🗺️</span>
            <span>Bản đồ khu vực hoạt động (mock)</span>
          </div>
          <p className="text-xs text-gray-600 max-w-lg">
            Hiển thị mô phỏng các quận đang phục vụ, sẽ thay bằng bản đồ thật khi tích hợp.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {serviceAreas.map((area) => (
          <label
            key={area.id}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              area.checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Checkbox checked={area.checked} />
            <span className="font-medium">{area.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          📍 Hiện đang phục vụ <strong>{selected.length} quận/huyện</strong>. Để mở rộng khu vực hoạt động, vui lòng liên hệ với chúng tôi.
        </p>
      </div>
    </Card>
  );
}
