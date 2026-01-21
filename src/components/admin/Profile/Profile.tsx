import { Key, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { ProfileHeader } from './ProfileHeader';
import { ProfileForm } from './ProfileForm';
import { SecuritySection } from './SecuritySection';
import { defaultProfile } from './mockData';

export function Profile() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ quản trị viên</h1>
        <p className="text-gray-600">Quản lý thông tin cá nhân và quyền truy cập hệ thống</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="security">
            <Key className="w-4 h-4 mr-2" />
            Bảo mật
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <ProfileHeader profile={defaultProfile} />
            <ProfileForm initialProfile={defaultProfile} />
          </div>
        </TabsContent>

        <TabsContent value="security">
          <SecuritySection />
        </TabsContent>
      </Tabs>
    </div>
  );
};