import { Calendar, Edit2, Mail, MapPin, Phone, Save } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { CollectorProfile } from './types';

interface PersonalInfoTabProps {
  profileData: CollectorProfile;
  isEditing: boolean;
  onFieldChange: (field: keyof CollectorProfile, value: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
}

export function PersonalInfoTab({
  profileData,
  isEditing,
  onFieldChange,
  onStartEdit,
  onCancelEdit,
  onSave,
}: PersonalInfoTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-emerald-600">
            {profileData.fullName.charAt(0)}
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1">{profileData.fullName}</h2>
            <p className="text-emerald-100">
              {profileData.position} • ID: {profileData.employeeId}
            </p>
            <div className="flex gap-3 mt-3">
              <Badge className="bg-white/20 text-white hover:bg-white/30">⭐ 156 công việc hoàn thành</Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">🏆 Cấp độ Gold</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <Button onClick={onStartEdit} className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              <Edit2 className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={onCancelEdit} className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
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
            <Label htmlFor="employeeId">Mã nhân viên</Label>
            <Input id="employeeId" value={profileData.employeeId} disabled className="mt-1 bg-gray-50" />
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
            <Label htmlFor="dateJoined">Ngày vào làm</Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="dateJoined" value={profileData.dateJoined} disabled className="pl-10 bg-gray-50" />
            </div>
          </div>

          <div>
            <Label htmlFor="position">Chức vụ</Label>
            <Input id="position" value={profileData.position} disabled className="mt-1 bg-gray-50" />
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

          <div>
            <Label htmlFor="emergencyContactName">Người liên hệ khẩn cấp</Label>
            <Input
              id="emergencyContactName"
              value={profileData.emergencyContactName}
              onChange={(e) => onFieldChange('emergencyContactName', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">SĐT liên hệ khẩn cấp</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="emergencyContact"
                type="tel"
                value={profileData.emergencyContact}
                onChange={(e) => onFieldChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
