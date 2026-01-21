import { useMemo, useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { ComplaintCard } from './ComplaintCard';
import { ComplaintDialog } from './ComplaintDialog';
import { StatsCards } from './StatsCards';
import type { Complaint, ComplaintStatus } from './types';
import { toast } from 'sonner';

export function Disputes() {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ComplaintStatus>('all');

  const complaints: Complaint[] = [
    {
      id: '1',
      complaintId: 'C-001',
      sender: { name: 'Nguyễn Văn A', role: 'Citizen' },
      relatedTo: '#R20240110-045',
      against: 'Green Recycle Co.',
      issue: 'Không thu đúng giờ hẹn',
      severity: 'high',
      status: 'new',
      createdAt: '10/01/2026',
      description: 'Đã hẹn 14:00 nhưng đến 18:00 vẫn chưa thu. Liên hệ nhiều lần không được.',
    },
    {
      id: '2',
      complaintId: 'C-002',
      sender: { name: 'Trần Thị B', role: 'Citizen' },
      relatedTo: '#R20240111-032',
      against: 'Eco Solutions Ltd',
      issue: 'Thu không đầy đủ',
      severity: 'medium',
      status: 'new',
      createdAt: '11/01/2026',
      description: 'Chỉ thu một phần, còn lại nhiều rác.',
    },
    {
      id: '3',
      complaintId: 'C-003',
      sender: { name: 'Lê Văn C', role: 'Citizen' },
      relatedTo: '#R20240109-078',
      against: 'Green Recycle Co.',
      issue: 'Thái độ không tốt',
      severity: 'medium',
      status: 'in-progress',
      createdAt: '09/01/2026',
      description: 'Nhân viên thu gom có thái độ cộc cằn, không thân thiện.',
    },
    {
      id: '4',
      complaintId: 'C-004',
      sender: { name: 'Green Recycle Co.', role: 'Enterprise' },
      relatedTo: '#R20240108-065',
      against: 'Phạm Thị D (Citizen)',
      issue: 'Thông tin không chính xác',
      severity: 'low',
      status: 'resolved',
      createdAt: '08/01/2026',
      description: 'Địa chỉ và khối lư��ng báo cáo sai.',
    },
  ];

  const filteredComplaints = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return complaints.filter((c) => {
      const matchesQuery =
        !query ||
        c.issue.toLowerCase().includes(query) ||
        c.complaintId.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [complaints, searchQuery, statusFilter]);

  const handleSelectComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsDialogOpen(true);
  };

  const handleResolve = (complaint: Complaint, action: string, note: string) => {
    toast.success('Đã xử lý khiếu nại thành công!', {
      description: `Khiếu nại ${complaint.complaintId} - Quyết định: ${action}.`,
    });
    setIsDialogOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Khiếu nại & Tranh chấp</h1>
        <p className="text-gray-600">Quản lý và xử lý các khiếu nại trong hệ thống</p>
      </div>

      <StatsCards complaints={complaints} />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <Label className="text-sm text-gray-600 mb-2 block">Tìm theo tên khiếu nại</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Nhập tên/vấn đề hoặc mã khiếu nại"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-gray-600 mb-2 block">Lọc trạng thái</Label>
            <Select value={statusFilter} onValueChange={(value : any) => setStatusFilter(value as 'all' | ComplaintStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="new">Chờ</SelectItem>
                <SelectItem value="in-progress">Đang xử lý</SelectItem>
                <SelectItem value="resolved">Đã giải quyết</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} onSelect={handleSelectComplaint} />
        ))}
      </div>

      {filteredComplaints.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center mt-4">
          <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không có khiếu nại nào</p>
        </div>
      )}

      <ComplaintDialog
        complaint={selectedComplaint}
        open={isDialogOpen && !!selectedComplaint}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedComplaint(null);
        }}
        onResolve={handleResolve}
      />
    </div>
  );
}