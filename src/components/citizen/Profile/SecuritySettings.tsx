import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export function SecuritySettings() {
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
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="mt-1"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
          </p>
        </div>

        <div className="pt-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700">Đổi mật khẩu</Button>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h4 className="font-semibold text-gray-900 mb-4">Phiên đăng nhập</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Chrome • Windows</p>
              <p className="text-sm text-gray-500">Hồ Chí Minh, Việt Nam • Hiện tại</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
