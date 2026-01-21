import { MapPin, Phone, Mail, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import type { UserFormData } from './types';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: UserFormData;
  onFormChange: (data: Partial<UserFormData>) => void;
  onSubmit: () => void;
}

export function AddUserDialog({ open, onOpenChange, formData, onFormChange, onSubmit }: AddUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 shadow-md">
          <UserPlus className="w-4 h-4 mr-2" />
          Thêm người dùng
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Thêm người dùng mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo tài khoản người dùng mới trong hệ thống
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nhập họ và tên đầy đủ"
                value={formData.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => onFormChange({ email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="0901234567"
                  value={formData.phone}
                  onChange={(e) => onFormChange({ phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium">Địa chỉ</Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Textarea
                  id="address"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={formData.address}
                  onChange={(e) => onFormChange({ address: e.target.value })}
                  className="pl-10 min-h-[80px]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="role" className="text-sm font-medium">
                Vai trò <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.role} onValueChange={(value: any) => onFormChange({ role: value })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">👤 Người dân</SelectItem>
                  <SelectItem value="enterprise">🏢 Doanh nghiệp</SelectItem>
                  <SelectItem value="collector">🚛 Nhân viên thu gom</SelectItem>
                  <SelectItem value="admin">⚙️ Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Mật khẩu khởi tạo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => onFormChange({ password: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Lưu ý:</strong> Người dùng sẽ nhận email thông báo và có thể đổi mật khẩu sau khi đăng nhập lần đầu.
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button className="border border-input bg-transparent hover:bg-accent hover:text-accent-foreground" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={onSubmit}>
            <UserPlus className="w-4 h-4 mr-2" />
            Tạo người dùng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
