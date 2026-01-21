import { Edit2, Mail, MapPin, Phone, Save } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { ProfileData } from './types';

interface PersonalInfoFormProps {
  profileData: ProfileData;
  isEditing: boolean;
  onFieldChange: (key: keyof ProfileData, value: string) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function PersonalInfoForm({
  profileData,
  isEditing,
  onFieldChange,
  onEdit,
  onCancel,
  onSave,
}: PersonalInfoFormProps) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <Button
            onClick={onEdit}
            className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            >
              Hủy
            </Button>
            <Button onClick={onSave} className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4 mr-2" />
              Lưu
            </Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Họ và tên *</Label>
          <Input
            id="fullName"
            value={profileData.fullName}
            onChange={(e) => onFieldChange('fullName', e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="city">Thành phố *</Label>
          <Input
            id="city"
            value={profileData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="district">Quận/Huyện *</Label>
          <Input
            id="district"
            value={profileData.district}
            onChange={(e) => onFieldChange('district', e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="ward">Phường/Xã *</Label>
          <Input
            id="ward"
            value={profileData.ward}
            onChange={(e) => onFieldChange('ward', e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Địa chỉ chi tiết *</Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="address"
              value={profileData.address}
              onChange={(e) => onFieldChange('address', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
