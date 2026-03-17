import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { ReportCard } from './ReportCard';
import type { CitizenReportItem } from '../../../services/citizenService';
import type { CitizenProfileData, PaginationState } from './types';
import { PAGE_SIZE } from './types';

interface CollectionReportsTabProps {
  profile: CitizenProfileData;
  loading: boolean;
  error: string | null;
  pages: PaginationState;
  pageLengths: PaginationState;
  onRetry: () => void;
  onChangePage: (tab: 'collection' | 'complaint' | 'reward', delta: number) => void;
  onCardClick: (report: CitizenReportItem) => void;
  onViewLocation: (report: CitizenReportItem) => void;
  onViewComplaint: (report: CitizenReportItem) => void;
}

export function CollectionReportsTab({
  profile,
  loading,
  error,
  pages,
  pageLengths,
  onRetry,
  onChangePage,
  onCardClick,
  onViewLocation,
  onViewComplaint,
}: CollectionReportsTabProps) {
  if (loading) return <Card className="p-6 text-gray-600">Đang tải báo cáo...</Card>;
  if (error)
    return (
      <Card className="p-6 text-red-600 space-y-3">
        <div>{error}</div>
        <button type="button" className="text-sm text-emerald-700 font-semibold" onClick={onRetry}>
          Thử lại
        </button>
      </Card>
    );
  if (!profile.collectionReports.length) {
    return <Card className="p-6 text-gray-600">Chưa có báo cáo thu gom</Card>;
  }

  return (
    <div className="space-y-4">
      {profile.collectionReports.map((report) => (
        <ReportCard
          key={report.collectionReportID}
          report={report}
          onClick={() => onCardClick(report)}
          onViewLocation={onViewLocation}
          onViewComplaint={onViewComplaint}
        />
      ))}
      <div className="flex items-center justify-end gap-3 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChangePage('collection', -1)}
            disabled={pages.collection === 0 || loading}
            className="h-8 px-2 text-sm"
          >
            ← Trước
          </Button>
          <span className="text-sm font-semibold text-gray-700">Trang {pages.collection + 1}</span>
          {pageLengths.collection >= PAGE_SIZE.collection && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChangePage('collection', 1)}
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
