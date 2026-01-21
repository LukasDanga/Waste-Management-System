import { Shield } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { CollectorProfile } from './types';

interface VehicleTabProps {
  profileData: CollectorProfile;
  onFieldChange: (field: keyof CollectorProfile, value: string) => void;
  onSave: () => void;
}

export function VehicleTab({ profileData, onFieldChange, onSave }: VehicleTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin phương tiện & Thiết bị</h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <Label htmlFor="vehicleType">Loại phương tiện *</Label>
          <Input
            id="vehicleType"
            value={profileData.vehicleType}
            onChange={(e) => onFieldChange('vehicleType', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="vehicleNumber">Biển số xe *</Label>
          <Input
            id="vehicleNumber"
            value={profileData.vehicleNumber}
            onChange={(e) => onFieldChange('vehicleNumber', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="licenseNumber">Số giấy phép lái xe *</Label>
          <Input
            id="licenseNumber"
            value={profileData.licenseNumber}
            onChange={(e) => onFieldChange('licenseNumber', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Thiết bị bảo hộ</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {["Găng tay bảo hộ", "Áo phản quang", "Giày bảo hộ", "Khẩu trang N95"].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">{item}</p>
                <p className="text-sm text-gray-500">Còn hiệu lực</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onSave}>
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
}
