import { MapPin, Map } from 'lucide-react';

export function MapView() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Bản đồ real-time</h2>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
          <Map className="w-4 h-4" />
          Toàn màn hình
        </button>
      </div>
      <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Bản đồ hiển thị tất cả báo cáo</p>
          <p className="text-sm text-gray-400 mt-1">Color-coded theo trạng thái</p>
        </div>

        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="text-xs font-semibold mb-2">Chú thích</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Khẩn cấp</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span>Chờ xử lý</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Đã phân công</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Đang/Đã xử lý</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
