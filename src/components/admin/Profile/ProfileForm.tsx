import { Mail, Phone, Edit2, Save } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { ProfileData } from './types';

interface ProfileFormProps {
  initialProfile: ProfileData;
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfile);

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Đã lưu thông tin thành công!');
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="border border-gray-200 bg-white text-gray-900 hover:bg-gray-50">
            <Edit2 className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} className="border border-gray-200 bg-white text-gray-900 hover:bg-gray-50">
              Hủy
            </Button>
            <Button onClick={handleSaveProfile} className="bg-emerald-600 hover:bg-emerald-700">
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
            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="adminId">Mã quản trị viên</Label>
          <Input id="adminId" value={profileData.adminId} disabled className="mt-1 bg-gray-50" />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
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
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="position">Chức vụ</Label>
          <Input id="position" value={profileData.position} disabled className="mt-1 bg-gray-50" />
        </div>

        <div>
          <Label htmlFor="department">Phòng ban</Label>
          <Input id="department" value={profileData.department} disabled className="mt-1 bg-gray-50" />
        </div>

        <div>
          <Label htmlFor="dateJoined">Ngày bắt đầu</Label>
          <Input id="dateJoined" value={profileData.dateJoined} disabled className="mt-1 bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
