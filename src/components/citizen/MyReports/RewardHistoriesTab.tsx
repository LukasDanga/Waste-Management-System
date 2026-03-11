import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { MapPin, Clock4, Gift } from 'lucide-react';
import type { CitizenProfileData, PaginationState, RewardHistoryItem } from './types';
import { PAGE_SIZE, formatDateTime } from './types';

interface RewardHistoriesTabProps {
  profile: CitizenProfileData;
  loading: boolean;
  error: string | null;
  pages: PaginationState;
  pageLengths: PaginationState;
  onRetry: () => void;
  onChangePage: (tab: 'collection' | 'complaint' | 'reward', delta: number) => void;
}

export function RewardHistoriesTab({
  profile,
  loading,
  error,
  pages,
  pageLengths,
  onRetry,
  onChangePage,
}: RewardHistoriesTabProps) {
  if (loading) return <Card className="p-6 text-gray-600">Đang tải lịch sử thưởng...</Card>;
  if (error)
    return (
      <Card className="p-6 text-red-600 space-y-3">
        <div>{error}</div>
        <button type="button" className="text-sm text-emerald-700 font-semibold" onClick={onRetry}>
          Thử lại
        </button>
      </Card>
    );
  if (!profile.rewardHistories.length) {
    return (
      <Card className="p-8 text-center">
        <Gift className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">Chưa có dữ liệu thưởng</p>
        <p className="text-sm text-gray-400 mt-1">Điểm thưởng bạn nhận được sẽ hiển thị tại đây</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {profile.rewardHistories.map((item: RewardHistoryItem) => (
        <Card key={item.rewardHistoryID || `${item.occurredAt}-${item.point}`} className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                  +{item.point ?? 0}
                </div>
                <div className="text-sm text-gray-800 font-semibold">
                  {item.reason || 'Không có mô tả'}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock4 className="h-4 w-4 text-emerald-600" />
                <span>{formatDateTime(item.occurredAt)}</span>
              </div>
              {item.citizenArea?.name && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span>{item.citizenArea.name}</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {item.rewardHistoryID ? `Mã: ${item.rewardHistoryID}` : ''}
            </div>
          </div>
        </Card>
      ))}
      <div className="flex items-center justify-end gap-3 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChangePage('reward', -1)}
            disabled={pages.reward === 0 || loading}
            className="h-8 px-2 text-sm"
          >
            ← Trước
          </Button>
          <span className="text-sm font-semibold text-gray-700">Trang {pages.reward + 1}</span>
          {pageLengths.reward >= PAGE_SIZE.reward && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChangePage('reward', 1)}
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
