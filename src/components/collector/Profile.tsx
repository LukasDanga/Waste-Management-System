import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Truck, Award, Shield, Calendar, Edit2, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Lê Văn C',
    employeeId: 'NV-2023-0015',
    email: 'levanc@moitruongxanh.vn',
    phone: '0901234567',
    address: '789 Đường DEF, Quận 5, TP.HCM',
    ward: 'Phường 1',
    district: 'Quận 5',
    city: 'TP. Hồ Chí Minh',
    dateJoined: '15/01/2023',
    position: 'Nhân viên thu gom',
    vehicleType: 'Xe tải nhỏ',
    vehicleNumber: '59C-12345',
    licenseNumber: 'B2-0123456789',
    emergencyContact: '0912345678',
    emergencyContactName: 'Lê Thị D',
  });

  const [workAreas, setWorkAreas] = useState([
    { id: 1, name: 'Quận 1', active: true },
    { id: 2, name: 'Quận 3', active: true },
    { id: 3, name: 'Quận 5', active: true },
    { id: 4, name: 'Quận 10', active: false },
  ]);

  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Đã lưu thông tin thành công!');
  };

  const toggleAvailability = (day: keyof typeof availability) => {
    setAvailability(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ nhân viên</h1>
        <p className="text-gray-600">Quản lý thông tin cá nhân và cấu hình làm việc</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="vehicle">
            <Truck className="w-4 h-4 mr-2" />
            Phương tiện & Thiết bị
          </TabsTrigger>
          <TabsTrigger value="areas">
            <MapPin className="w-4 h-4 mr-2" />
            Khu vực phụ trách
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Award className="w-4 h-4 mr-2" />
            Thành tích
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-emerald-600">
                  {profileData.fullName.charAt(0)}
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">{profileData.fullName}</h2>
                  <p className="text-emerald-100">{profileData.position} • ID: {profileData.employeeId}</p>
                  <div className="flex gap-3 mt-3">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      ⭐ 156 công việc hoàn thành
                    </Badge>
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      🏆 Cấp độ Gold
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
                  <Label htmlFor="employeeId">Mã nhân viên</Label>
                  <Input
                    id="employeeId"
                    value={profileData.employeeId}
                    disabled
                    className="mt-1 bg-gray-50"
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
                  <Label htmlFor="dateJoined">Ngày vào làm</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="dateJoined"
                      value={profileData.dateJoined}
                      disabled
                      className="pl-10 bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="position">Chức vụ</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    disabled
                    className="mt-1 bg-gray-50"
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

                <div>
                  <Label htmlFor="emergencyContactName">Người liên hệ khẩn cấp</Label>
                  <Input
                    id="emergencyContactName"
                    value={profileData.emergencyContactName}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
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
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Vehicle Tab */}
        <TabsContent value="vehicle">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin phương tiện & Thiết bị</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="vehicleType">Loại phương tiện *</Label>
                <Input
                  id="vehicleType"
                  value={profileData.vehicleType}
                  onChange={(e) => setProfileData({ ...profileData, vehicleType: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="vehicleNumber">Biển số xe *</Label>
                <Input
                  id="vehicleNumber"
                  value={profileData.vehicleNumber}
                  onChange={(e) => setProfileData({ ...profileData, vehicleNumber: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="licenseNumber">Số giấy phép lái xe *</Label>
                <Input
                  id="licenseNumber"
                  value={profileData.licenseNumber}
                  onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Thiết bị bảo hộ</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Găng tay bảo hộ</p>
                    <p className="text-sm text-gray-500">Còn hiệu lực</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Áo phản quang</p>
                    <p className="text-sm text-gray-500">Còn hiệu lực</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Giày bảo hộ</p>
                    <p className="text-sm text-gray-500">Còn hiệu lực</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Khẩu trang N95</p>
                    <p className="text-sm text-gray-500">Còn hiệu lực</p>
                  </div>
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

        {/* Work Areas Tab */}
        <TabsContent value="areas">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Khu vực phụ trách</h3>

            <div className="space-y-4 mb-6">
              {workAreas.map((area) => (
                <div key={area.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900">{area.name}</p>
                      <p className="text-sm text-gray-500">TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                  <Badge variant={area.active ? "default" : "secondary"} className={area.active ? "bg-emerald-100 text-emerald-700" : ""}>
                    {area.active ? 'Đang hoạt động' : 'Không hoạt động'}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Lịch làm việc trong tuần</h4>
              <div className="space-y-3">
                {[
                  { key: 'monday', label: 'Thứ Hai' },
                  { key: 'tuesday', label: 'Thứ Ba' },
                  { key: 'wednesday', label: 'Thứ Tư' },
                  { key: 'thursday', label: 'Thứ Năm' },
                  { key: 'friday', label: 'Thứ Sáu' },
                  { key: 'saturday', label: 'Thứ Bảy' },
                  { key: 'sunday', label: 'Chủ Nhật' },
                ].map((day) => (
                  <div key={day.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <p className="font-medium text-gray-900">{day.label}</p>
                    <Switch
                      checked={availability[day.key as keyof typeof availability]}
                      onCheckedChange={() => toggleAvailability(day.key as keyof typeof availability)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Lưu cấu hình
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Thành tích làm việc</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-700 mb-1">Tổng công việc hoàn thành</p>
                <p className="text-3xl font-bold text-emerald-600">156</p>
                <p className="text-xs text-emerald-600 mt-1">Từ 15/01/2023</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">Tỷ lệ hoàn thành đúng hạn</p>
                <p className="text-3xl font-bold text-blue-600">98.7%</p>
                <p className="text-xs text-blue-600 mt-1">⭐ Xuất sắc</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-amber-700 mb-1">Đánh giá trung bình</p>
                <p className="text-3xl font-bold text-amber-600">4.9/5.0</p>
                <p className="text-xs text-amber-600 mt-1">⭐⭐⭐⭐⭐</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Huy hiệu & Thành tựu</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">Nhân viên xuất sắc tháng 11</p>
                    <p className="text-sm text-gray-500">Đạt được 15/11/2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Award className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900">100 công việc hoàn thành</p>
                    <p className="text-sm text-gray-500">Đạt được 05/10/2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Không trễ hẹn trong 3 tháng</p>
                    <p className="text-sm text-gray-500">Đạt được 01/11/2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Award className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">5 sao từ người dùng</p>
                    <p className="text-sm text-gray-500">Liên tục 30 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
