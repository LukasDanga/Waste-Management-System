import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export function SecuritySection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Bảo mật tài khoản</h3>

      <div className="space-y-6 max-w-xl">
        <div>
          <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
          <Input id="currentPassword" type="password" placeholder="Nhập mật khẩu hiện tại" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="newPassword">Mật khẩu mới</Label>
          <Input id="newPassword" type="password" placeholder="Nhập mật khẩu mới" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
          <Input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" className="mt-1" />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Yêu cầu mật khẩu Admin:</strong> Tối thiểu 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
          </p>
        </div>

        <div className="pt-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700">Đổi mật khẩu</Button>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h4 className="font-semibold text-gray-900 mb-4">Xác thực hai yếu tố (2FA)</h4>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Bảo mật nâng cao với 2FA</p>
            <p className="text-sm text-gray-500">Thêm lớp bảo mật bằng mã xác thực</p>
          </div>
          <Button className="border border-gray-200 bg-white text-gray-900 hover:bg-gray-50">Kích hoạt 2FA</Button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <h4 className="font-semibold text-gray-900 mb-4">Khóa API</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">API Key Production</p>
              <p className="text-sm text-gray-500 font-mono">sk_live_••••••••••••8x2K</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
