import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import type { ReportFormData } from './types';

interface StepDetailsProps {
  formData: ReportFormData;
  onChange: (data: Partial<ReportFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting?: boolean;
  onUploadImage: () => void;
  uploadingImage?: boolean;
  uploadedImageName?: string;
}

export function StepDetails({ formData, onChange, onBack, onSubmit, submitting, onUploadImage, uploadingImage, uploadedImageName }: StepDetailsProps) {
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [addressResult, setAddressResult] = useState('');

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Thiết bị không hỗ trợ GPS');
      return;
    }

    setGeoError('');
    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        onChange({ latitude: Number(latitude.toFixed(6)), longitude: Number(longitude.toFixed(6)) });
        setAddressResult('');
        setGeoError('');
        setGeoLoading(false);
      },
      (err) => {
        setGeoError(err.message || 'Không thể lấy vị trí.');
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Mô tả *</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Mô tả chi tiết về rác cần thu gom..."
            rows={4}
            className="bg-input-background resize-none"
          />
          <div className="text-xs text-gray-500 text-right">{formData.description.length}/500</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Vĩ độ (latitude) *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                step="0.000001"
                value={formData.latitude ?? ''}
                onChange={(e) => {
                  setGeoError('');
                  setAddressError('');
                  setAddressResult('');
                  onChange({ latitude: e.target.value === '' ? null : Number(e.target.value) });
                }}
                className="pl-10 bg-input-background"
                placeholder="16.450000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Kinh độ (longitude) *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                step="0.000001"
                value={formData.longitude ?? ''}
                onChange={(e) => {
                  setGeoError('');
                  setAddressError('');
                  setAddressResult('');
                  onChange({ longitude: e.target.value === '' ? null : Number(e.target.value) });
                }}
                className="pl-10 bg-input-background"
                placeholder="107.550000"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={geoLoading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60"
          >
            {geoLoading ? 'Đang lấy tọa độ...' : 'Lấy tọa độ hiện tại'}
          </Button>
          <Button
            type="button"
            onClick={async () => {
              if (formData.latitude == null || formData.longitude == null) {
                setAddressError('Vui lòng nhập đủ tọa độ.');
                return;
              }

              setGeoError('');
              setAddressError('');
              setAddressResult('');
              setAddressLoading(true);

              try {
                const res = await fetch(
                  `https://geocode.maps.co/reverse?lat=${formData.latitude}&lon=${formData.longitude}&api_key=699d00d8ad6a6903279315xyoa5f1ca`
                );
                if (!res.ok) {
                  throw new Error('Không thể tra cứu địa chỉ.');
                }
                const data = await res.json();
                const name = data?.display_name || 'Không tìm thấy địa chỉ.';
                setGeoError('');
                setAddressResult(name);
              } catch (error) {
                setAddressError(error instanceof Error ? error.message : 'Lỗi tra cứu địa chỉ.');
              } finally {
                setAddressLoading(false);
              }
            }}
            disabled={addressLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          >
            {addressLoading ? 'Đang tra cứu...' : 'Tra cứu địa chỉ'}
          </Button>
          {geoError && <span className="text-sm text-red-600">{geoError}</span>}
          {addressError && <span className="text-sm text-red-600">{addressError}</span>}
        </div>

        {(addressResult || addressLoading) && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
            <div className="font-semibold mb-1">Địa chỉ tương ứng</div>
            <div className="text-gray-700">
              {addressLoading ? 'Đang lấy địa chỉ...' : addressResult || 'Chưa có địa chỉ'}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="font-semibold text-gray-800">Thông tin hình ảnh</div>
            <Button
              type="button"
              onClick={onUploadImage}
              disabled={uploadingImage}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 h-9 w-9 p-0 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-3">
              <span>Tên file:</span>
              <span className="font-medium">{formData.imageName || 'Chưa chọn file'}</span>
            </div>
            <div className="text-sm text-gray-500">
              {uploadingImage ? 'Đang tải ảnh...' : ''}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onBack} className="flex-1 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100">
            Quay lại
          </Button>
          <Button onClick={onSubmit} disabled={submitting} className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60">
            {submitting ? 'Đang gửi...' : 'Gửi báo cáo'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
