import { useEffect, useState } from 'react';
import { fetchWasteTypes, type WasteTypeItem } from '../../../services/citizenService';
import { createCapacity, fetchAreas, type CitizenArea } from '../../../services/enterpriseService';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface CapacityFormProps {
  onSuccess?: () => void;
}

export function CapacityForm({ onSuccess }: CapacityFormProps) {
  const [areas, setAreas] = useState<CitizenArea[]>([]);
  const [wasteTypes, setWasteTypes] = useState<WasteTypeItem[]>([]);
  const [fetchingOptions, setFetchingOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    wasteType: '',
    regionCode: '',
    maxDailyCapacity: '',
  });

  useEffect(() => {
    async function loadOptions() {
      try {
        const [areasData, wasteData] = await Promise.all([
          fetchAreas(),
          fetchWasteTypes(),
        ]);
        setAreas(areasData);
        setWasteTypes(wasteData);
        if (wasteData.length > 0) setForm(f => ({ ...f, wasteType: wasteData[0].type }));
        if (areasData.length > 0) setForm(f => ({ ...f, regionCode: areasData[0].regionCode }));
      } catch (e: any) {
        setError(e?.message || 'Không tải được dữ liệu');
      } finally {
        setFetchingOptions(false);
      }
    }
    loadOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.wasteType || !form.regionCode || !form.maxDailyCapacity) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const capacity = Number(form.maxDailyCapacity);
    if (isNaN(capacity) || capacity <= 0) {
      setError('Năng lực tối đa phải là số dương');
      return;
    }

    setLoading(true);
    try {
      await createCapacity({
        wasteType: form.wasteType,
        regionCode: form.regionCode,
        maxDailyCapacity: capacity,
        unitOfMeasure: 0,
      });
      setSuccess(true);
      setForm(f => ({ ...f, maxDailyCapacity: '' }));
      onSuccess?.();
    } catch (e: any) {
      setError(e?.message || 'Đăng ký năng lực thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-2">Đăng ký năng lực thu gom</h2>
      <p className="text-sm text-gray-500 mb-6">
        Thêm năng lực xử lý theo loại rác và khu vực hoạt động
      </p>

      {fetchingOptions ? (
        <div className="text-center py-8 text-gray-500">Đang tải dữ liệu...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="wasteType">Loại rác *</Label>
              <select
                id="wasteType"
                value={form.wasteType}
                onChange={e => setForm(f => ({ ...f, wasteType: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {wasteTypes.map(wt => (
                  <option key={wt.type} value={wt.type}>
                    {wt.description || wt.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regionCode">Khu vực *</Label>
              <select
                id="regionCode"
                value={form.regionCode}
                onChange={e => setForm(f => ({ ...f, regionCode: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {areas.map(area => (
                  <option key={area.citizenAreaID} value={area.regionCode}>
                    {area.name} ({area.regionCode})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="maxDailyCapacity">Năng lực tối đa mỗi ngày (kg) *</Label>
              <Input
                id="maxDailyCapacity"
                type="number"
                min={1}
                placeholder="VD: 500"
                value={form.maxDailyCapacity}
                onChange={e => setForm(f => ({ ...f, maxDailyCapacity: e.target.value }))}
                className="bg-input-background"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
              ✅ Đăng ký năng lực thành công!
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký năng lực'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm(f => ({ ...f, maxDailyCapacity: '' }))}
              disabled={loading}
            >
              Đặt lại
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
