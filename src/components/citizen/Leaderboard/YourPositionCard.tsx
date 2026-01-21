import { Card } from '../../ui/card';

export function YourPositionCard() {
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👤</div>
          <div>
            <h3 className="font-bold text-lg mb-1">Vị trí của bạn</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-semibold">#24</span>
              <span className="text-gray-600">Quận 3</span>
              <span className="font-semibold text-green-600">2,350 điểm</span>
              <span className="text-gray-600">157 báo cáo</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Bạn cần thêm</p>
          <p className="text-2xl font-bold text-blue-600">500 điểm</p>
          <p className="text-xs text-gray-500">để lên #23</p>
        </div>
      </div>
    </Card>
  );
}
