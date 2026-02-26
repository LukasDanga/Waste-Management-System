import { useEffect, useMemo, useState } from 'react';
import { MapPin, RefreshCw, Eye, LocateFixed, X } from 'lucide-react';
import { fetchCitizenReports, type CitizenReportItem } from '../../../services/citizenService';
import { toast } from 'sonner';

export function ReportMonitoring() {
  const [reports, setReports] = useState<CitizenReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ regionCode: '', wasteType: '' });
  const [locationModal, setLocationModal] = useState({
    open: false,
    lat: 0,
    lon: 0,
    address: '',
    loading: false,
    error: '',
  });

  const loadReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCitizenReports({
        regionCode: filters.regionCode || undefined,
        wasteType: filters.wasteType || undefined,
      });
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được báo cáo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      const byWaste = !filters.wasteType || item.wasteType === filters.wasteType;
      const byRegion = !filters.regionCode || item.regionCode === filters.regionCode;
      return byWaste && byRegion;
    });
  }, [reports, filters]);

  const statusLabel = (status: number) => {
    if (status === 0) return 'Mới tạo';
    if (status === 1) return 'Đang xử lý';
    if (status === 2) return 'Hoàn thành';
    return `Trạng thái ${status}`;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Giám sát báo cáo</h1>
          <p className="text-gray-600">Danh sách báo cáo thu gom từ người dân</p>
        </div>
        <button
          type="button"
          onClick={loadReports}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" /> Làm mới
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Khu vực (RegionCode)</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Nhập mã khu vực"
              value={filters.regionCode}
              onChange={(e) => setFilters((f) => ({ ...f, regionCode: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại rác (WasteType)</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="ELECTRONIC / PLASTIC ..."
              value={filters.wasteType}
              onChange={(e) => setFilters((f) => ({ ...f, wasteType: e.target.value }))}
            />
          </div>
          <div className="md:hidden" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {loading && <div className="p-6 text-center text-gray-600">Đang tải báo cáo...</div>}
        {error && <div className="p-6 text-center text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-fixed">
              <colgroup>
                <col style={{ width: '22%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '8%' }} />
              </colgroup>
              <thead className="bg-gray-50 text-left text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Họ tên</th>
                  <th className="px-4 py-3 font-semibold">Loại rác</th>
                  <th className="px-4 py-3 font-semibold">Tọa độ</th>
                  <th className="px-4 py-3 font-semibold">Trạng thái</th>
                  <th className="px-4 py-3 font-semibold">Thời gian</th>
                  <th className="px-4 py-3 font-semibold text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((item) => (
                  <tr key={item.collectionReportID} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 truncate" title={item.citizenName || 'Chưa xác định'}>
                      {item.citizenName || 'Chưa xác định'}
                    </td>
                    <td className="px-4 py-3 text-gray-700 truncate" title={item.wasteType}>{item.wasteType}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>{item.gps.latitude}, {item.gps.longitude}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{statusLabel(item.status)}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{new Date(item.reportAt).toLocaleString('vi-VN')}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="h-9 w-9 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-700"
                          title="Xem"
                          onClick={() => toast.info('Tính năng đang phát triển')}
                        >
                          <Eye className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          type="button"
                          className="h-9 w-9 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 text-gray-600 hover:text-green-700"
                          title="Xem vị trí"
                          onClick={async () => {
                            setLocationModal({ open: true, lat: item.gps.latitude, lon: item.gps.longitude, address: '', loading: true, error: '' });
                            try {
                              const res = await fetch(
                                `https://geocode.maps.co/reverse?lat=${item.gps.latitude}&lon=${item.gps.longitude}&api_key=699d00d8ad6a6903279315xyoa5f1ca`
                              );
                              if (!res.ok) throw new Error('Không thể tra cứu địa chỉ');
                              const data = await res.json();
                              const name = data?.display_name || 'Không tìm thấy địa chỉ';
                              setLocationModal((m) => ({ ...m, address: name, loading: false }));
                            } catch (err) {
                              setLocationModal((m) => ({ ...m, error: err instanceof Error ? err.message : 'Lỗi tra cứu địa chỉ', loading: false }));
                            }
                          }}
                        >
                          <LocateFixed className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filteredReports.length === 0 && (
          <div className="p-10 text-center text-gray-500">Không có báo cáo phù hợp</div>
        )}
      </div>

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
    </div>
  );
}
