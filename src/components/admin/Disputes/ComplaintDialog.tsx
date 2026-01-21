import { useState } from 'react';
import { Building2, CheckCircle, User } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { SeverityBadge, StatusBadge } from './ComplaintBadges';
import type { Complaint } from './types';

interface ComplaintDialogProps {
  complaint: Complaint | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResolve: (complaint: Complaint, action: string, note: string) => void;
}

export function ComplaintDialog({ complaint, open, onOpenChange, onResolve }: ComplaintDialogProps) {
  const [action, setAction] = useState('');
  const [note, setNote] = useState('');

  const handleResolve = () => {
    if (!complaint || !action || !note) {
      toast.error('Vui lòng nhập đầy đủ thông tin xử lý');
      return;
    }
    onResolve(complaint, action, note);
    setAction('');
    setNote('');
  };

  if (!complaint) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết khiếu nại {complaint.complaintId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Người gửi</label>
              <div className="mt-1 flex items-center gap-2">
                {complaint.sender.role === 'Citizen' ? (
                  <User className="w-4 h-4 text-blue-600" />
                ) : (
                  <Building2 className="w-4 h-4 text-green-600" />
                )}
                <span>
                  {complaint.sender.name} ({complaint.sender.role})
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Liên quan đến</label>
              <div className="mt-1 text-green-600 font-medium">{complaint.relatedTo}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Đối tượng</label>
              <div className="mt-1">{complaint.against}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Mức độ</label>
              <div className="mt-1">
                <SeverityBadge severity={complaint.severity} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Vấn đề</label>
            <div className="mt-1 font-medium text-gray-900">{complaint.issue}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Mô tả chi tiết</label>
            <div className="mt-1 p-4 bg-gray-50 rounded-lg border border-gray-200">{complaint.description}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Lịch sử trao đổi</label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-sm font-medium mb-1">{complaint.sender.name}</div>
                  <div className="text-sm text-gray-700">{complaint.description}</div>
                  <div className="text-xs text-gray-500 mt-2">{complaint.createdAt} 14:30</div>
                </div>
              </div>
            </div>
          </div>

          {(complaint.status === 'new' || complaint.status === 'in-progress') && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900">Xử lý khiếu nại</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quyết định xử lý</label>
                <Select value={action} onValueChange={setAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quyết định" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted">Chấp nhận khiếu nại</SelectItem>
                    <SelectItem value="partial">Chấp nhận một phần</SelectItem>
                    <SelectItem value="rejected">Từ chối khiếu nại</SelectItem>
                    <SelectItem value="need-info">Cần thêm thông tin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú xử lý</label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập chi tiết về cách xử lý khiếu nại..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleResolve} className="bg-green-600 hover:bg-green-700 flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Xác nhận xử lý
                </Button>
                <Button className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => onOpenChange(false)}>
                  Hủy
                </Button>
              </div>
            </div>
          )}

          {complaint.status === 'resolved' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Đã giải quyết</span>
              </div>
              <p className="text-sm text-green-700">Khiếu nại đã được xử lý thành công vào ngày 11/01/2026</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <StatusBadge status={complaint.status} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
