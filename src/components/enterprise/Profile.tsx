import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, FileText, User, Calendar, Award, Edit2, Save, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: 'Công ty Môi trường Xanh',
    taxCode: '0123456789',
    businessLicense: 'GPKD-2020-001234',
    email: 'contact@moitruongxanh.vn',
    phone: '028-1234-5678',
    website: 'www.moitruongxanh.vn',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    ward: 'Phường Võ Thị Sáu',
    district: 'Quận 3',
    city: 'TP. Hồ Chí Minh',
    representativeName: 'Trần Thị B',
    representativePhone: '0987654321',
    representativeEmail: 'tranthib@moitruongxanh.vn',
    representativePosition: 'Giám đốc',
    foundedYear: '2020',
    employeeCount: '50-100',
    operatingHours: '07:00 - 17:00',
    description: 'Công ty chuyên cung cấp dịch vụ thu gom và xử lý rác thải với hơn 3 năm kinh nghiệm.',
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Đã lưu thông tin doanh nghiệp thành công!');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ doanh nghiệp</h1>
        <p className="text-gray-600">Quản lý thông tin doanh nghiệp và cấu hình hệ thống</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company">
            <Building2 className="w-4 h-4 mr-2" />
            Thông tin công ty
          </TabsTrigger>
          <TabsTrigger value="representative">
            <User className="w-4 h-4 mr-2" />
            Người đại diện
          </TabsTrigger>
          <TabsTrigger value="license">
            <FileText className="w-4 h-4 mr-2" />
            Giấy phép & Chứng chỉ
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Award className="w-4 h-4 mr-2" />
            Hiệu suất
          </TabsTrigger>
        </TabsList>

        {/* Company Information Tab */}
        <TabsContent value="company">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Company Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg bg-white flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">{profileData.companyName}</h2>
                  <p className="text-emerald-100">Doanh nghiệp thu gom rác thải</p>
                  <div className="flex gap-4 mt-3">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      ⭐ 4.8/5.0
                    </Badge>
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      ✓ Đã xác minh
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-6">
              <div className="flex justify-end mb-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)} variant="outline">
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
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Tên công ty *</Label>
                  <Input
                    id="companyName"
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="taxCode">Mã số thuế *</Label>
                  <Input
                    id="taxCode"
                    value={profileData.taxCode}
                    onChange={(e) => setProfileData({ ...profileData, taxCode: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="businessLicense">Số giấy phép kinh doanh *</Label>
                  <Input
                    id="businessLicense"
                    value={profileData.businessLicense}
                    onChange={(e) => setProfileData({ ...profileData, businessLicense: e.target.value })}
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
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
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
                      onChange={(e) => setProfileData({ ...profileData, foundedYear: e.target.value })}
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
                    onChange={(e) => setProfileData({ ...profileData, employeeCount: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="operatingHours">Giờ hoạt động</Label>
                  <Input
                    id="operatingHours"
                    value={profileData.operatingHours}
                    onChange={(e) => setProfileData({ ...profileData, operatingHours: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Thành phố *</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="district">Quận/Huyện *</Label>
                  <Input
                    id="district"
                    value={profileData.district}
                    onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="ward">Phường/Xã *</Label>
                  <Input
                    id="ward"
                    value={profileData.ward}
                    onChange={(e) => setProfileData({ ...profileData, ward: e.target.value })}
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
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
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
                    onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Representative Tab */}
        <TabsContent value="representative">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin người đại diện</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="representativeName">Họ và tên *</Label>
                <Input
                  id="representativeName"
                  value={profileData.representativeName}
                  onChange={(e) => setProfileData({ ...profileData, representativeName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="representativePosition">Chức vụ *</Label>
                <Input
                  id="representativePosition"
                  value={profileData.representativePosition}
                  onChange={(e) => setProfileData({ ...profileData, representativePosition: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="representativeEmail">Email *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="representativeEmail"
                    type="email"
                    value={profileData.representativeEmail}
                    onChange={(e) => setProfileData({ ...profileData, representativeEmail: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="representativePhone">Số điện thoại *</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="representativePhone"
                    type="tel"
                    value={profileData.representativePhone}
                    onChange={(e) => setProfileData({ ...profileData, representativePhone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Lưu thông tin
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* License Tab */}
        <TabsContent value="license">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Giấy phép & Chứng chỉ</h3>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900">Giấy phép kinh doanh</p>
                      <p className="text-sm text-gray-500">Số: GPKD-2020-001234</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">Còn hiệu lực</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Ngày cấp: 15/03/2020 • Nơi cấp: Sở KH&ĐT TP.HCM</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900">Giấy phép thu gom rác thải</p>
                      <p className="text-sm text-gray-500">Số: GPTG-2020-5678</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">Còn hiệu lực</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Ngày cấp: 20/04/2020 • Nơi cấp: Sở TN&MT TP.HCM</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900">Chứng nhận ISO 14001:2015</p>
                      <p className="text-sm text-gray-500">Quản lý môi trường</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">Còn hiệu lực</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Ngày cấp: 10/06/2021 • Hết hạn: 10/06/2026</p>
              </div>

              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Tải lên giấy phép mới
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Hiệu suất hoạt động</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-700 mb-1">Tổng yêu cầu đã hoàn thành</p>
                <p className="text-3xl font-bold text-emerald-600">1,847</p>
                <p className="text-xs text-emerald-600 mt-1">↑ 12% so với tháng trước</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">Tỷ lệ hoàn thành đúng hạn</p>
                <p className="text-3xl font-bold text-blue-600">94.5%</p>
                <p className="text-xs text-blue-600 mt-1">↑ 2.3% so với tháng trước</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-amber-700 mb-1">Đánh giá trung bình</p>
                <p className="text-3xl font-bold text-amber-600">4.8/5.0</p>
                <p className="text-xs text-amber-600 mt-1">⭐⭐⭐⭐⭐</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Thành tích nổi bật</h4>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-900">Doanh nghiệp xuất sắc tháng 11/2025</p>
                  <p className="text-sm text-gray-500">Được bình chọn bởi hệ thống EcoWaste</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Award className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900">100% yêu cầu hoàn thành đúng hạn</p>
                  <p className="text-sm text-gray-500">Thành tựu đạt được trong tháng 10/2025</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
