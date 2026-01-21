import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export function CapacityForm() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Cập nhật thông tin năng lực</h2>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Tên doanh nghiệp *</Label>
            <Input defaultValue="Green Recycle Co., Ltd" className="bg-input-background" />
          </div>

          <div className="space-y-2">
            <Label>Số giấy phép *</Label>
            <Input defaultValue="#ENV-2024-001" className="bg-input-background" />
          </div>

          <div className="space-y-2">
            <Label>Số điện thoại *</Label>
            <Input defaultValue="028 1234 5678" className="bg-input-background" />
          </div>

          <div className="space-y-2">
            <Label>Email *</Label>
            <Input defaultValue="contact@greenrecycle.vn" className="bg-input-background" type="email" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Địa chỉ trụ sở *</Label>
          <Input defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM" className="bg-input-background" />
        </div>

        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">Cập nhật thông tin</Button>
          <Button className="border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50">
            Yêu cầu mở rộng năng lực
          </Button>
        </div>
      </div>
    </Card>
  );
}
