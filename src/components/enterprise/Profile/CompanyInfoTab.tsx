import { Building2, Calendar, Edit2, MapPin, Mail, Phone, Save } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import type { EnterpriseProfile } from './types';

interface CompanyInfoTabProps {
  profileData: EnterpriseProfile;
  isEditing: boolean;
  onFieldChange: (field: keyof EnterpriseProfile, value: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
}

export function CompanyInfoTab({
  profileData,
  isEditing,
  onFieldChange,
  onStartEdit,
  onCancelEdit,
  onSave,
}: CompanyInfoTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-lg bg-white flex items-center justify-center">
            <Building2 className="w-12 h-12 text-emerald-600" />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1">{profileData.companyName}</h2>
            <p className="text-emerald-100">Doanh nghiệp thu gom rác thải</p>
            <div className="flex gap-4 mt-3">
              <Badge className="bg-white/20 text-white hover:bg-white/30">⭐ 4.8/5.0</Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">✓ Đã xác minh</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <Button onClick={onStartEdit} className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
              <Edit2 className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={onCancelEdit} className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
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
          <div className="md:col-span-2">
            <Label htmlFor="companyName">Tên công ty *</Label>
            <Input
              id="companyName"
              value={profileData.companyName}
              onChange={(e) => onFieldChange('companyName', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="taxCode">Mã số thuế *</Label>
            <Input
              id="taxCode"
              value={profileData.taxCode}
              onChange={(e) => onFieldChange('taxCode', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="businessLicense">Số giấy phép kinh doanh *</Label>
            <Input
              id="businessLicense"
              value={profileData.businessLicense}
              onChange={(e) => onFieldChange('businessLicense', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email doanh nghiệp *</Label>
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
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={profileData.website}
              onChange={(e) => onFieldChange('website', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="foundedYear">Năm thành lập</Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="foundedYear"
                value={profileData.foundedYear}
                onChange={(e) => onFieldChange('foundedYear', e.target.value)}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="employeeCount">Số lượng nhân viên</Label>
            <Input
              id="employeeCount"
              value={profileData.employeeCount}
              onChange={(e) => onFieldChange('employeeCount', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="operatingHours">Giờ hoạt động</Label>
            <Input
              id="operatingHours"
              value={profileData.operatingHours}
              onChange={(e) => onFieldChange('operatingHours', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
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

          <div className="md:col-span-2">
            <Label htmlFor="description">Mô tả về công ty</Label>
            <Textarea
              id="description"
              value={profileData.description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
