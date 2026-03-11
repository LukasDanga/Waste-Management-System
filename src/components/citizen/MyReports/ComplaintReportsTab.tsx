import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { API_CONFIG } from '../../../config/api.config';
import { ChevronRight, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import type { CitizenProfileData, ComplaintReportItem, PaginationState } from './types';
import { PAGE_SIZE, formatDateTime } from './types';

interface ComplaintReportsTabProps {
  profile: CitizenProfileData;
  loading: boolean;
  error: string | null;
  pages: PaginationState;
  pageLengths: PaginationState;
  onRetry: () => void;
  onChangePage: (tab: 'collection' | 'complaint' | 'reward', delta: number) => void;
}

const COMPLAINT_STATUS: Record<number, { label: string; className: string }> = {
  0: { label: 'Chờ xử lý', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  1: { label: 'Đang xem xét', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  2: { label: 'Đã giải quyết', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  3: { label: 'Từ chối', className: 'bg-red-50 text-red-700 border-red-200' },
};

const FALLBACK_REMOTE = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80';

const getImageBase = () => {
  const base = API_CONFIG.IMAGE_BASE_URL || API_CONFIG.BASE_URL || '';
  return base.replace(/\/+$/, '');
};

const resolveImageUrl = (imageName?: string) => {
  const base = getImageBase();
  if (!base) return FALLBACK_REMOTE;
  if (!imageName) return `${base}/placeholder.webp`;
  if (/^https?:\/\//i.test(imageName)) return imageName;
  return `${base}/${imageName}`;
};

function ComplaintCard({ complaint }: { complaint: ComplaintReportItem }) {
  const statusInfo = COMPLAINT_STATUS[complaint.status] || {
    label: `Trạng thái ${complaint.status}`,
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  const areaText = complaint.citizenArea?.name || '';

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Image thumbnail – same size as ReportCard */}
        <div className="flex-shrink-0">
          <img
            src={resolveImageUrl(complaint.imageName)}
            alt={complaint.title}
            className="w-24 h-24 object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_REMOTE;
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xl">📋</span>
              <h3 className="font-bold text-lg truncate">{complaint.title}</h3>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-gray-600 line-clamp-1">{complaint.description}</p>
            {areaText && (
              <p className="text-gray-600 flex items-center gap-1 truncate">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="truncate">{areaText}</span>
              </p>
            )}
            <p className="text-gray-500 flex items-center gap-1">🕐 {formatDateTime(complaint.reportAt)}</p>
            <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
          </div>

          {/* Admin note inline */}
          {complaint.adminNote && (
            <div className="mt-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-blue-800">Phản hồi:</span>
                <span className="text-xs text-blue-700 truncate">{complaint.adminNote}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right side – chevron to match ReportCard */}
        <div className="flex items-center">
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </Card>
  );
}

export function ComplaintReportsTab({
  profile,
  loading,
  error,
  pages,
  pageLengths,
  onRetry,
  onChangePage,
}: ComplaintReportsTabProps) {
  if (loading) return <Card className="p-6 text-gray-600">Đang tải khiếu nại...</Card>;
  if (error)
    return (
      <Card className="p-6 text-red-600 space-y-3">
        <div>{error}</div>
        <button type="button" className="text-sm text-emerald-700 font-semibold" onClick={onRetry}>
          Thử lại
        </button>
      </Card>
    );
  if (!profile.complaintReports.length) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">Chưa có khiếu nại nào</p>
        <p className="text-sm text-gray-400 mt-1">Các khiếu nại bạn gửi sẽ hiển thị tại đây</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {profile.complaintReports.map((complaint) => (
        <ComplaintCard key={complaint.complaintReportID} complaint={complaint} />
      ))}
      <div className="flex items-center justify-end gap-3 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChangePage('complaint', -1)}
            disabled={pages.complaint === 0 || loading}
            className="h-8 px-2 text-sm"
          >
            ← Trước
          </Button>
          <span className="text-sm font-semibold text-gray-700">Trang {pages.complaint + 1}</span>
          {pageLengths.complaint >= PAGE_SIZE.complaint && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChangePage('complaint', 1)}
              disabled={loading}
              className="h-8 px-2 text-sm"
            >
              Sau →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
