import { useEffect, useState, useMemo } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { ComplaintCard } from './ComplaintCard';
import { ComplaintDialog } from './ComplaintDialog';
import { StatsCards } from './StatsCards';
import type { Complaint, ComplaintStatus } from './types';
import { toast } from 'sonner';
import { fetchComplaintReports, resolveComplaintReport } from '@/services/citizenService';
import type { ComplaintReportItem } from '@/services/citizenService';

function mapStatusFromApi(status: number): ComplaintStatus {
  if (status === 0) return 'new';
  if (status === 1) return 'in-progress';
  if (status === 2) return 'resolved';
  return 'closed';
}

function formatReportAt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return iso;
  }
}

function mapComplaintReportToComplaint(item: ComplaintReportItem): Complaint {
  return {
    id: item.complaintReportID,
    complaintId: `KN-${item.complaintReportID.slice(0, 8)}`,
    sender: { name: 'Công dân', role: 'Citizen' },
    relatedTo: `Báo cáo ${item.collectionReportID.slice(0, 8)}...`,
    against: item.citizenArea?.name ?? '—',
    issue: item.title,
    severity: 'medium',
    status: mapStatusFromApi(item.status),
    createdAt: formatReportAt(item.reportAt),
    description: item.description,
    imageName: item.imageName,
    adminNote: item.adminNote,
  };
}

export function Disputes() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ComplaintStatus>('all');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchComplaintReports()
      .then((list) => setComplaints(list.map(mapComplaintReportToComplaint)))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Không tải được danh sách khiếu nại');
        setComplaints([]);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const handleResolve = async (complaint: Complaint, note: string) => {
    try {
      await resolveComplaintReport(complaint.id, note);
      toast.success('Đã xử lý khiếu nại thành công!', {
        description: `Khiếu nại ${complaint.complaintId} - Ghi chú đã lưu.`,
      });
      setIsDialogOpen(false);
      setSelectedComplaint(null);
      const list = await fetchComplaintReports();
      setComplaints(list.map(mapComplaintReportToComplaint));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Giải quyết khiếu nại thất bại');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Khiếu nại & Tranh chấp</h1>
        <p className="text-gray-600">Quản lý và xử lý các khiếu nại trong hệ thống</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <StatsCards complaints={complaints} />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}