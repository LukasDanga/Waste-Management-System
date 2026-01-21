import React, { useState } from 'react';
import { Bell, Shield, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { NotificationSettings } from './NotificationSettings';
import { PageHeader } from './PageHeader';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProfileHeroCard } from './ProfileHeroCard';
import { SecuritySettings } from './SecuritySettings';
import type { NotificationPreferences, ProfileData } from './types';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0912345678',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    avatar: '',
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
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

  const handleProfileFieldChange = (key: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotificationChange = (key: keyof NotificationPreferences) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Hồ sơ cá nhân"
        subtitle="Quản lý thông tin cá nhân và cài đặt tài khoản của bạn"
      />

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
            <ProfileHeroCard
              fullName={profileData.fullName}
              levelLabel="Người dân • Cấp độ Eco Warrior"
              statsLabel="🏆 1,250 điểm • ⭐ Hạng 42"
            />

            <div className="p-6">
              <PersonalInfoForm
                profileData={profileData}
                isEditing={isEditing}
                onFieldChange={handleProfileFieldChange}
                onEdit={() => setIsEditing(true)}
                onCancel={() => setIsEditing(false)}
                onSave={handleSaveProfile}
              />
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <NotificationSettings
            preferences={notifications}
            onToggle={handleNotificationChange}
          />
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
