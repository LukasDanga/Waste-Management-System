import { useMemo, useState } from 'react';
import { Download, Plus, Eye, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Input } from '../../ui/input';
import type { Collector } from './types';
import { createCollector } from '../../../services/enterpriseService';

export function CollectorManagement() {
  const [adding, setAdding] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    contactInfo: '',
    gender: 'Male',
    dob: '',
    password: '',
  });

  const collectors: Collector[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Nguyễn Văn B',
        email: 'collector1@example.com',
        phone: '0901234567',
        vehicle: 'Xe tải nhỏ',
        licensePlate: '51A-12345',
        status: 'available',
        statusLabel: 'Đang rảnh',
        todayJobs: { completed: 3, total: 8 },
        weekJobs: 42,
        avatar: '👨',
        joinDate: '01/2024',
      },
      {
        id: 2,
        name: 'Trần Văn C',
        email: 'collector2@example.com',
        phone: '0907654321',
        vehicle: 'Xe tải trung',
        licensePlate: '51B-67890',
        status: 'busy',
        statusLabel: 'Đang có 2 việc',
        todayJobs: { completed: 5, total: 10 },
        weekJobs: 38,
        avatar: '👨',
        joinDate: '03/2024',
      },
      {
        id: 3,
        name: 'Lê Minh D',
        email: 'collector3@example.com',
        phone: '0909876543',
        vehicle: 'Xe tải nhỏ',
        licensePlate: '51C-11223',
        status: 'available',
        statusLabel: 'Đang rảnh',
        todayJobs: { completed: 4, total: 8 },
        weekJobs: 52,
        avatar: '👨',
        joinDate: '12/2023',
      },
      {
        id: 4,
        name: 'Phạm Thị E',
        email: 'collector4@example.com',
        phone: '0903456789',
        vehicle: 'Xe máy chuyên dụng',
        licensePlate: '51D-44556',
        status: 'available',
        statusLabel: 'Đang rảnh',
        todayJobs: { completed: 6, total: 12 },
        weekJobs: 35,
        avatar: '👩',
        joinDate: '05/2024',
      },
    ],
    [],
  );

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.password || !form.dob) {
      toast.error('Vui lòng nhập đầy đủ họ tên, email, mật khẩu và ngày sinh');
      return;
    }
    setAdding(true);
    try {
      await createCollector({
        contactInfo: form.contactInfo || form.phone || 'N/A',
        email: form.email,
        fullName: form.fullName,
        gender: form.gender,
        dob: form.dob,
        password: form.password,
      });
      toast.success('Tạo collector mới thành công');
      setForm({ fullName: '', email: '', phone: '', contactInfo: '', gender: 'Male', dob: '', password: '' });
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Tạo collector thất bại');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quản lý Collector</h1>
            <p className="text-gray-600">Quản lý nhân viên thu gom rác thải</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700" disabled={adding} onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              {adding ? 'Đang thêm...' : 'Thêm Collector mới'}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/4">Tên</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/4">Email</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/5">Số điện thoại</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/6">Gia nhập</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 text-right w-[140px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collectors.map((collector) => (
              <TableRow key={collector.id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-3 text-sm font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-sm">
                      {collector.avatar}
                    </span>
                    <span>{collector.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-700">{collector.email}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-700">{collector.phone}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-700">{collector.joinDate}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-right text-gray-700 w-[140px]">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="h-9 w-9 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-500 hover:text-blue-700"
                      title="Xem chi tiết"
                      onClick={() => toast.info('Tính năng đang phát triển')}
                    >
                      <Eye className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      type="button"
                      className="h-9 w-9 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-500 hover:text-emerald-700"
                      title="Phân công"
                      onClick={() => toast.info('Tính năng đang phát triển')}
                    >
                      <ClipboardList className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Thêm Collector mới</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Họ tên</label>
              <Input
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                placeholder="Nguyen Van Collector"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="collector@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Số điện thoại</label>
              <Input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value, contactInfo: e.target.value }))}
                placeholder="0901234567"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Giới tính</label>
              <Input
                value={form.gender}
                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                placeholder="Male / Female"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Ngày sinh</label>
              <Input
                type="date"
                value={form.dob}
                onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Mật khẩu</label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••"
              />
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setFormOpen(false)} disabled={adding}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={adding}>
              {adding ? 'Đang lưu...' : 'Lưu' }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
