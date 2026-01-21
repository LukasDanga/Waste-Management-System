import { Card } from '../../ui/card';

export function TipsCard() {
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
      <div className="flex items-start gap-4">
        <div className="text-4xl">💡</div>
        <div>
          <h3 className="font-semibold mb-2">Mẹo nhỏ</h3>
          <p className="text-sm text-gray-700">
            Phân loại rác đúng cách sẽ giúp bạn nhận được nhiều điểm thưởng hơn! Hãy chụp ảnh rõ ràng và
            cung cấp thông tin chi tiết.
          </p>
        </div>
      </div>
    </Card>
  );
}
