import { useEffect, useState } from 'react';
import { API_CONFIG } from '../../../config/api.config';
import type { CitizenReportItem } from '../../../services/citizenService';
import { fetchCitizenReports } from '../../../services/citizenService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { FiltersBar } from './FiltersBar';
import { RequestCard } from './RequestCard';
import type { FiltersState, RequestItem } from './types';

interface CollectionRequestsProps {
  onNavigate: (section: string, data?: any) => void;
  justAssignedId?: string | null;
}

const WASTE_TYPE_LABELS: Record<string, string> = {
  ORGANIC: '🌿 Rác hữu cơ',
  RECYCLABLE: '♻️ Rác tái chế',
  ELECTRONIC: '⚡ Rác điện tử',
  HAZARDOUS: '☢️ Rác nguy hại',
  GENERAL: '🗑️ Rác thông thường',
  CONSTRUCTION: '🧱 Rác xây dựng',
};

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

function mapToRequestItem(r: CitizenReportItem): RequestItem {
  const statusCode = r.status ?? 0;
  const status: RequestItem['status'] =
    statusCode === 1 ? 'accepted' : statusCode === 2 ? 'rejected' : 'pending';
  const wasteUpper = (r.wasteType ?? '').toUpperCase();
  const imageName = r.imageName ?? '';
  const imageUrl = imageName
    ? `${API_CONFIG.IMAGE_BASE_URL}/${imageName}`
    : 'https://placehold.co/400x300?text=No+Image';
  return {
    collectionReportID: r.collectionReportID,
    id: `#${r.collectionReportID.slice(0, 8).toUpperCase()}`,
    regionCode: r.regionCode ?? '',
    type: r.wasteType ?? '',
    typeLabel: WASTE_TYPE_LABELS[wasteUpper] ?? `🗑️ ${r.wasteType}`,
    timeAgo: getTimeAgo(r.reportAt),
    reportAt: r.reportAt,
    priority: 'medium',
    priorityLabel: 'Trung bình',
    aiReason: null,
    reporter: r.citizenName ?? r.citizenProfileID?.slice(0, 8) ?? 'Người dùng',
    citizenProfileID: r.citizenProfileID ?? '',
    description: r.description ?? '',
    statusCode,
    status,
    image: imageUrl,
    imageName,
    gps: r.gps,
  };
}

export function CollectionRequests({ onNavigate, justAssignedId }: CollectionRequestsProps) {
  const [filters, setFilters] = useState<FiltersState>({
    area: 'all',
    type: 'all',
  });
  const [allReports, setAllReports] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCitizenReports()
      .then((list) => {
        const mapped = list.map(mapToRequestItem);
        if (justAssignedId) {
          setAllReports(
            mapped.map((r) =>
              r.collectionReportID === justAssignedId
                ? { ...r, statusCode: 1, status: 'accepted' as const }
                : r,
            ),
          );
        } else {
          setAllReports(mapped);
        }
      })
      .catch((err) => setError(err.message ?? 'Tải danh sách thất bại'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = allReports.filter((r) => {
    if (filters.area !== 'all' && r.regionCode !== filters.area) return false;
    if (filters.type !== 'all' && r.type.toUpperCase() !== filters.type.toUpperCase()) return false;
    return true;
  });

  const pendingList = filtered.filter((r) => r.status === 'pending');
  const acceptedList = filtered.filter((r) => r.status === 'accepted');
  const rejectedList = filtered.filter((r) => r.status === 'rejected');

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleNavigateToDetail = (request: RequestItem) => {
    onNavigate('request-detail', request);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Yêu cầu thu gom</h1>
        <p className="text-gray-600">Quản lý và xử lý các yêu cầu từ người dân</p>
      </div>

      <FiltersBar filters={filters} onChange={handleFilterChange} />

      {loading && (
        <div className="text-center py-12 text-gray-500">Đang tải...</div>
      )}
      {error && (
        <div className="text-center py-12 text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              🆕 Chờ phân công ({pendingList.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              👷 Đã phân công ({acceptedList.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              ❌ Từ chối ({rejectedList.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingList.length === 0 && (
              <div className="text-center py-12 text-gray-500">Không có yêu cầu mới</div>
            )}
            {pendingList.map((request) => (
              <RequestCard
                key={request.collectionReportID}
                request={request}
                onNavigate={() => handleNavigateToDetail(request)}
              />
            ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {acceptedList.length === 0 && (
              <div className="text-center py-12 text-gray-500">Chưa có yêu cầu nào được phân công</div>
            )}
            {acceptedList.map((request) => (
              <RequestCard
                key={request.collectionReportID}
                request={request}
                onNavigate={() => handleNavigateToDetail(request)}
              />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedList.length === 0 && (
              <div className="text-center py-12 text-gray-500">Không có yêu cầu bị từ chối</div>
            )}
            {rejectedList.map((request) => (
              <RequestCard
                key={request.collectionReportID}
                request={request}
                onNavigate={() => handleNavigateToDetail(request)}
              />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
