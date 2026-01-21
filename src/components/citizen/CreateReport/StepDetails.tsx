import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Slider } from '../../ui/slider';
import { Textarea } from '../../ui/textarea';
import type { ReportFormData } from './types';

interface WasteTypeOption {
  value: string;
  label: string;
  color: string;
}

interface StepDetailsProps {
  formData: ReportFormData;
  onChange: (data: Partial<ReportFormData>) => void;
  wasteTypes: WasteTypeOption[];
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

export function StepDetails({ formData, onChange, wasteTypes, onBack, onSaveDraft, onSubmit }: StepDetailsProps) {
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  const getWeightLabel = (value: number) => {
    if (value < 33) return 'Nhỏ (<5kg)';
    if (value < 67) return 'Trung bình (5-20kg)';
    return 'Lớn (>20kg)';
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Thiết bị không hỗ trợ GPS');
      return;
    }

    setGeoError('');
    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude, longitude } = coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data?.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setGeoError('');
          onChange({ location: address });
        } catch (error) {
          setGeoError('Không thể lấy địa chỉ, thử lại.');
        } finally {
          setGeoLoading(false);
        }
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
          <Label>Loại rác *</Label>
          <Select value={formData.wasteType} onValueChange={(value : any) => onChange({ wasteType: value })}>
            <SelectTrigger className="bg-input-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {wasteTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className={type.color}>{type.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Vị trí *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={formData.location}
              onChange={(e) => {
                setGeoError('');
                onChange({ location: e.target.value });
              }}
              className="pl-10 bg-input-background"
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={geoLoading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-60"
            >
              {geoLoading ? 'Đang lấy vị trí...' : 'Lấy vị trí hiện tại'}
            </Button>
            {geoError && <span className="text-sm text-red-600">{geoError}</span>}
          </div>
          <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            🗺️ Bản đồ (GPS auto-detect)
          </div>
        </div>

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

        <div className="space-y-2">
          <Label>Khối lượng ước tính</Label>
          <div className="pt-2 pb-4">
            <Slider
              value={[formData.weight]}
              onValueChange={(value : any) => onChange({ weight: value[0] })}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="text-center font-semibold text-green-600">{getWeightLabel(formData.weight)}</div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onBack} className="flex-1 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100">
            Quay lại
          </Button>
          <Button onClick={onSaveDraft} className="flex-1 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100">
            Lưu nháp
          </Button>
          <Button onClick={onSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
            Gửi báo cáo
          </Button>
        </div>
      </div>
    </Card>
  );
}
