import { useEffect, useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import type { EnterpriseMember } from './types';
import { createCollector, getMyProfile } from '../../../services/enterpriseService';

const formatDate = (dateString?: string) => {
  if (!dateString || dateString.startsWith('0001')) return '—';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('vi-VN');
};

export function CollectorManagement() {
  const [members, setMembers] = useState<EnterpriseMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contactInfo: '',
    gender: 'Male',
    dob: '',
    password: '',
  });

  const loadMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyProfile();
      setMembers(res.payload?.members || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.password || !form.dob) {
      toast.error('Vui lòng nhập đầy đủ họ tên, email, mật khẩu và ngày sinh');
      return;
    }
    setAdding(true);
    try {
      await createCollector({
        contactInfo: form.contactInfo || 'N/A',
        email: form.email,
        fullName: form.fullName,
        gender: form.gender,
        dob: form.dob,
        password: form.password,
      });
      toast.success('Tạo collector mới thành công');
      setForm({ fullName: '', email: '', contactInfo: '', gender: 'Male', dob: '', password: '' });
      setFormOpen(false);
      loadMembers();
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
            <button
              type="button"
              onClick={() => loadMembers()}
              className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Làm mới
            </button>
            <Button className="bg-blue-600 hover:bg-blue-700" disabled={adding} onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Thêm Collector
            </Button>
          </div>
        </div>
      </div>

      {loading && <Card className="p-6 text-gray-600">Đang tải danh sách...</Card>}
      {error && (
        <Card className="p-6 text-red-600 space-y-3">
          <div>{error}</div>
          <button type="button" className="text-sm text-emerald-700 font-semibold" onClick={() => loadMembers()}>
            Thử lại
          </button>
        </Card>
      )}

      {!loading && !error && members.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Chưa có collector nào</p>
          <p className="text-sm text-gray-400 mt-1">Thêm collector mới để bắt đầu</p>
        </Card>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/4">Tên</TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/4">Email</TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/6">Giới tính</TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/6">Ngày sinh</TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-1/6">Ngày tham gia</TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 w-[100px] text-center">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.memberID} className="hover:bg-gray-50">
                  <TableCell className="px-4 py-3 text-sm font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-sm">
                        {member.userInformation.gender === 'Female' ? '👩' : '👨'}
                      </span>
                      <span>{member.userInformation.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-700">{member.userInformation.email}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-700">
                    {member.userInformation.gender === 'Male' ? 'Nam' : member.userInformation.gender === 'Female' ? 'Nữ' : member.userInformation.gender}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-700">{formatDate(member.userInformation.dob)}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-700">{formatDate(member.assignedAt)}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      member.userInformation.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {member.userInformation.isActive ? 'Hoạt động' : 'Ngưng'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

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
              <label className="text-sm font-medium text-gray-800">Thông tin liên hệ</label>
              <Input
                value={form.contactInfo}
                onChange={(e) => setForm((f) => ({ ...f, contactInfo: e.target.value }))}
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
              {adding ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
