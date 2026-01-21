import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield, Camera, Edit2, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0912345678',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    avatar: '',
  });

  const [notifications, setNotifications] = useState({
    reportUpdates: true,
    pointsRewards: true,
    systemNews: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // TODO: Save to backend
    alert('Đã lưu thông tin thành công!');
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ cá nhân</h1>
        <p className="text-gray-600">Quản lý thông tin cá nhân và cài đặt tài khoản của bạn</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Bảo mật
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Avatar Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-emerald-600">
                    {profileData.fullName.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">{profileData.fullName}</h2>
                  <p className="text-emerald-100">Người dân • Cấp độ Eco Warrior</p>
                  <p className="text-emerald-100 mt-2">🏆 1,250 điểm • ⭐ Hạng 42</p>
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
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt thông báo</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">Cập nhật báo cáo</p>
                  <p className="text-sm text-gray-500">Nhận thông báo khi báo cáo của bạn được xử lý</p>
                </div>
                <Switch
                  checked={notifications.reportUpdates}
                  onCheckedChange={() => handleNotificationChange('reportUpdates')}
                />
              </div>

              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">Điểm thưởng & Phần thưởng</p>
                  <p className="text-sm text-gray-500">Thông báo về điểm thưởng và phần thưởng mới</p>
                </div>
                <Switch
                  checked={notifications.pointsRewards}
                  onCheckedChange={() => handleNotificationChange('pointsRewards')}
                />
              </div>

              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">Tin tức hệ thống</p>
                  <p className="text-sm text-gray-500">Cập nhật về tính năng mới và thông báo hệ thống</p>
                </div>
                <Switch
                  checked={notifications.systemNews}
                  onCheckedChange={() => handleNotificationChange('systemNews')}
                />
              </div>

              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">Thông báo Email</p>
                  <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between pb-4">
                <div>
                  <p className="font-medium text-gray-900">Thông báo SMS</p>
                  <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn SMS</p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={() => handleNotificationChange('smsNotifications')}
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Lưu cài đặt thông báo
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Bảo mật tài khoản</h3>

            <div className="space-y-6 max-w-xl">
              <div>
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  className="mt-1"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
                </p>
              </div>

              <div className="pt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Đổi mật khẩu
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h4 className="font-semibold text-gray-900 mb-4">Phiên đăng nhập</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Chrome • Windows</p>
                    <p className="text-sm text-gray-500">Hồ Chí Minh, Việt Nam • Hiện tại</p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
