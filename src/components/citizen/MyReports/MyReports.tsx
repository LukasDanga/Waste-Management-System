import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import { Card } from '../../ui/card';
import { ReportCard } from './ReportCard';
import {
  createComplaintReport,
  fetchCitizenProfile,
  uploadReportImage,
  type CitizenReportItem,
} from '../../../services/citizenService';
import type { CitizenProfileData, TabKey } from './types';
import { MapPin, X, MessageSquare, UploadCloud } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface MyReportsProps {
  onNavigate: (section: string, data?: any) => void;
}

const DEFAULT_PROFILE: CitizenProfileData = {
  collectionReports: [],
  complaintReports: [],
  rewardHistories: [],
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'collectionReports', label: 'Báo cáo thu gom' },
  { key: 'complaintReports', label: 'Khiếu nại' },
  { key: 'rewardHistories', label: 'Lịch sử thưởng' },
];

export function MyReports({ onNavigate }: MyReportsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('collectionReports');
  const [profile, setProfile] = useState<CitizenProfileData>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationModal, setLocationModal] = useState({
    open: false,
    lat: 0,
    lon: 0,
    address: '',
    loading: false,
    error: '',
  });
  const [complaintModal, setComplaintModal] = useState<{ open: boolean; report?: CitizenReportItem }>(
    { open: false }
  );
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageFile: null as File | null,
    submitting: false,
  });

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCitizenProfile();
      setProfile({
        collectionReports: data.collectionReports || [],
        complaintReports: data.complaintReports || [],
        rewardHistories: data.rewardHistories || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const renderCollectionReports = () => {
    if (loading) return <Card className="p-6 text-gray-600">Đang tải báo cáo...</Card>;
    if (error)
      return (
        <Card className="p-6 text-red-600 space-y-3">
          <div>{error}</div>
          <button
            type="button"
            className="text-sm text-emerald-700 font-semibold"
            onClick={loadProfile}
          >
            Thử lại
          </button>
        </Card>
      );
    if (!profile.collectionReports.length) {
      return <Card className="p-6 text-gray-600">Chưa có báo cáo thu gom</Card>;
    }

    const handleCardClick = (report: CitizenReportItem) => {
      onNavigate?.('report-detail', report);
      toast.info('Xem chi tiết sẽ được cập nhật sớm');
    };

    const handleViewLocation = async (report: CitizenReportItem) => {
      setLocationModal({ open: true, lat: report.gps.latitude, lon: report.gps.longitude, address: '', loading: true, error: '' });
      try {
        const res = await fetch(
          `https://geocode.maps.co/reverse?lat=${report.gps.latitude}&lon=${report.gps.longitude}&api_key=699d00d8ad6a6903279315xyoa5f1ca`
        );
        if (!res.ok) throw new Error('Không thể tra cứu địa chỉ');
        const data = await res.json();
        const name = data?.display_name || 'Không tìm thấy địa chỉ';
        setLocationModal((m) => ({ ...m, address: name, loading: false }));
      } catch (err) {
        setLocationModal((m) => ({ ...m, error: err instanceof Error ? err.message : 'Lỗi tra cứu địa chỉ', loading: false }));
      }
    };

    const handleViewComplaint = (report: CitizenReportItem) => {
      setComplaintForm({
        title: 'Khiếu nại về báo cáo',
        description: '',
        imageUrl: '',
        imageFile: null,
        submitting: false,
      });
      setComplaintModal({ open: true, report });
    };

    return (
      <div className="space-y-4">
        {profile.collectionReports.map((report) => (
          <ReportCard
            key={report.collectionReportID}
            report={report}
            onClick={() => handleCardClick(report)}
            onViewLocation={handleViewLocation}
            onViewComplaint={handleViewComplaint}
          />
        ))}
      </div>
    );
  };

  const renderPlaceholder = (message: string) => (
    <Card className="p-6 text-gray-600">{message}</Card>
  );

  const renderContent = () => {
    if (activeTab === 'collectionReports') return renderCollectionReports();
    if (activeTab === 'complaintReports') return renderPlaceholder('Tính năng đang phát triển cho khiếu nại');
    return renderPlaceholder('Tính năng đang phát triển cho lịch sử thưởng');
  };

  const closeComplaintModal = () => {
    setComplaintModal({ open: false });
    setComplaintForm({ title: '', description: '', imageUrl: '', imageFile: null, submitting: false });
  };

  const handleComplaintSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!complaintModal.report) {
      toast.error('Không xác định được báo cáo để khiếu nại');
      return;
    }

    const title = complaintForm.title.trim();
    const description = complaintForm.description.trim();
    const url = complaintForm.imageUrl.trim();

    if (!title || !description) {
      toast.error('Vui lòng nhập tiêu đề và nội dung khiếu nại');
      return;
    }

    if (!complaintForm.imageFile && !url) {
      toast.error('Vui lòng chọn ảnh hoặc nhập URL ảnh');
      return;
    }

    setComplaintForm((f) => ({ ...f, submitting: true }));
    try {
      let imageName = url;
      if (complaintForm.imageFile) {
        imageName = await uploadReportImage(complaintForm.imageFile, 'ComplaintReport');
      }

      await createComplaintReport({
        collectionReportID: complaintModal.report.collectionReportID,
        title,
        description,
        imageName,
      });

      toast.success('Đã gửi khiếu nại thành công');
      closeComplaintModal();
      loadProfile();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gửi khiếu nại thất bại');
    } finally {
      setComplaintForm((f) => ({ ...f, submitting: false }));
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold mb-2">Báo cáo của tôi</h1>
          <p className="text-gray-600">Quản lý và theo dõi các báo cáo rác thải của bạn</p>
        </div>
        <button
          type="button"
          onClick={loadProfile}
          className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Làm mới
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
              activeTab === tab.key
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}

      {locationModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Địa chỉ vị trí báo cáo</h3>
              <button
                type="button"
                className="h-10 w-10 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
                onClick={() => setLocationModal({ open: false, lat: 0, lon: 0, address: '', loading: false, error: '' })}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 text-base text-gray-800">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-medium">Tọa độ:</span>
                <span>{locationModal.lat}, {locationModal.lon}</span>
              </div>
              {locationModal.loading && <div className="text-gray-600">Đang tra cứu địa chỉ...</div>}
              {locationModal.error && <div className="text-red-600">{locationModal.error}</div>}
              {!locationModal.loading && !locationModal.error && locationModal.address && (
                <div className="text-gray-900 leading-relaxed bg-gray-50 border border-gray-200 rounded-lg p-4">
                  {locationModal.address}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                className="px-5 py-2.5 rounded-lg border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
                onClick={() => setLocationModal({ open: false, lat: 0, lon: 0, address: '', loading: false, error: '' })}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {complaintModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                Khiếu nại
              </div>
              <button
                type="button"
                className="h-10 w-10 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
                onClick={closeComplaintModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleComplaintSubmit} className="px-6 py-5 space-y-5 text-base text-gray-800">
              {complaintModal.report && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm space-y-1 mt-2">
                  <div className="font-semibold">Báo cáo: {complaintModal.report.wasteType}</div>
                  <div className="text-gray-600 line-clamp-2">{complaintModal.report.description}</div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">Tiêu đề</label>
                <Input
                  value={complaintForm.title}
                  onChange={(e) => setComplaintForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Nhập tiêu đề khiếu nại"
                  disabled={complaintForm.submitting}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">Nội dung</label>
                <textarea
                  className="w-full min-h-[120px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải"
                  disabled={complaintForm.submitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-800">Ảnh minh chứng</label>
                  <span className="text-xs text-gray-500">Chọn một trong hai cách</span>
                </div>
                <Input
                  value={complaintForm.imageUrl}
                  onChange={(e) => setComplaintForm((f) => ({ ...f, imageUrl: e.target.value, imageFile: null }))}
                  placeholder="Dán URL ảnh (tùy chọn)"
                  disabled={complaintForm.submitting}
                />
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    <span>Chọn tệp</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={complaintForm.submitting}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setComplaintForm((f) => ({ ...f, imageFile: file, imageUrl: file ? '' : f.imageUrl }));
                      }}
                      className="hidden"
                    />
                  </label>
                  {complaintForm.imageFile && (
                    <span className="text-sm text-gray-600">Đã chọn: {complaintForm.imageFile.name}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 disabled:opacity-50"
                  onClick={closeComplaintModal}
                  disabled={complaintForm.submitting}
                >
                  Đóng
                </button>
                <Button type="submit" disabled={complaintForm.submitting}>
                  {complaintForm.submitting ? 'Đang gửi...' : 'Gửi khiếu nại'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
