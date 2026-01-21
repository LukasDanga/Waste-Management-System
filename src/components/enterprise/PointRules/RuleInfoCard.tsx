import { Card } from '../../ui/card';

export function RuleInfoCard() {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
      <div className="flex items-start gap-4">
        <div className="text-4xl">💡</div>
        <div>
          <h3 className="font-bold text-lg mb-2">Hướng dẫn</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Quy tắc sẽ được áp dụng tự động cho tất cả báo cáo từ người dân</li>
            <li>• Có thể thiết lập nhiều quy tắc cho cùng một loại rác</li>
            <li>• Điểm thưởng sẽ được cộng dồn nếu đáp ứng nhiều điều kiện</li>
            <li>• Thay đổi quy tắc chỉ áp dụng cho báo cáo mới, không ảnh hưởng dữ liệu cũ</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
