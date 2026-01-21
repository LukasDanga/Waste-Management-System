import { useEffect, useState } from 'react';
import { Building2, MapPin, Phone, Mail, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import type { Enterprise, EnterpriseStatus } from './types';

interface EnterpriseEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enterprise: Enterprise | null;
  onSave: (updated: Enterprise) => void;
}

export function EnterpriseEditDialog({ open, onOpenChange, enterprise, onSave }: EnterpriseEditDialogProps) {
  const [form, setForm] = useState<Enterprise | null>(enterprise);

  useEffect(() => {
    setForm(enterprise);
  }, [enterprise]);

  const handleSave = () => {
    if (!form) return;
    onSave(form);
  };

  if (!form) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-emerald-50 via-white to-white border-b border-emerald-100">
          <DialogHeader className="p-0">
            <DialogTitle className="text-2xl font-semibold">Chỉnh sửa doanh nghiệp</DialogTitle>
            <p className="text-sm text-gray-600 mt-1">Cập nhật thông tin liên hệ, giấy phép và phạm vi hoạt động</p>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm flex items-start gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <Label htmlFor="name">Tên doanh nghiệp</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="license">Giấy phép</Label>
                  <Input id="license" value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select value={form.status} onValueChange={(value: EnterpriseStatus) => setForm({ ...form, status: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Đã duyệt</SelectItem>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="suspended">Đình chỉ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold">
                <Phone className="h-4 w-4 text-emerald-600" />
                Liên hệ
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="phone">Điện thoại</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Địa chỉ & Collector
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="collectors">Collector</Label>
                  <Input
                    id="collectors"
                    type="number"
                    value={form.collectors}
                    onChange={(e) => setForm({ ...form, collectors: Number(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-3">
              <Users className="h-4 w-4 text-emerald-600" />
              Khu vực hoạt động
            </div>
            <Label htmlFor="areas" className="text-sm text-gray-600">Khu vực (phân tách dấu phẩy)</Label>
            <Input
              id="areas"
              value={form.areas.join(', ')}
              onChange={(e) =>
                setForm({ ...form, areas: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })
              }
              className="mt-2"
              placeholder="Ví dụ: Quận 1, Quận 3, Quận 7"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button className="border border-gray-200 text-gray-700" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>Lưu thay đổi</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
