import { useState } from 'react';
import { Award, MapPin, Truck, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AreasTab } from './AreasTab';
import { PerformanceTab } from './PerformanceTab';
import { PersonalInfoTab } from './PersonalInfoTab';
import { VehicleTab } from './VehicleTab';
import type {
  Achievement,
  Availability,
  CollectorProfile,
  PerformanceStat,
  WorkArea,
} from './types';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<CollectorProfile>({
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

  const [workAreas] = useState<WorkArea[]>([
    { id: 1, name: 'Quận 1', active: true },
    { id: 2, name: 'Quận 3', active: true },
    { id: 3, name: 'Quận 5', active: true },
    { id: 4, name: 'Quận 10', active: false },
  ]);

  const [availability, setAvailability] = useState<Availability>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const performanceStats: PerformanceStat[] = [
    { label: 'Tổng công việc hoàn thành', value: '156', helper: 'Từ 15/01/2023', tone: 'emerald' },
    { label: 'Tỷ lệ hoàn thành đúng hạn', value: '98.7%', helper: '⭐ Xuất sắc', tone: 'blue' },
    { label: 'Đánh giá trung bình', value: '4.9/5.0', helper: '⭐⭐⭐⭐⭐', tone: 'amber' },
  ];

  const achievements: Achievement[] = [
    { title: 'Nhân viên xuất sắc tháng 11', subtitle: 'Đạt được 15/11/2025', colorClass: 'bg-yellow-50 border-yellow-200' },
    { title: '100 công việc hoàn thành', subtitle: 'Đạt được 05/10/2025', colorClass: 'bg-emerald-50 border-emerald-200' },
    { title: 'Không trễ hẹn trong 3 tháng', subtitle: 'Đạt được 01/11/2025', colorClass: 'bg-blue-50 border-blue-200' },
    { title: '5 sao từ người dùng', subtitle: 'Liên tục 30 ngày', colorClass: 'bg-purple-50 border-purple-200' },
  ];

  const handleFieldChange = (field: keyof CollectorProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Đã lưu thông tin thành công!');
  };

  const handleVehicleSave = () => {
    alert('Đã lưu thông tin phương tiện');
  };

  const handleToggleAvailability = (day: keyof Availability) => {
    setAvailability((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSaveAvailability = () => {
    alert('Đã lưu cấu hình lịch làm việc');
  };

  return (
    <div className="p-8">
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

        <TabsContent value="personal">
          <PersonalInfoTab
            profileData={profileData}
            isEditing={isEditing}
            onFieldChange={handleFieldChange}
            onStartEdit={() => setIsEditing(true)}
            onCancelEdit={() => setIsEditing(false)}
            onSave={handleSaveProfile}
          />
        </TabsContent>

        <TabsContent value="vehicle">
          <VehicleTab profileData={profileData} onFieldChange={handleFieldChange} onSave={handleVehicleSave} />
        </TabsContent>

        <TabsContent value="areas">
          <AreasTab
            workAreas={workAreas}
            availability={availability}
            onToggleAvailability={handleToggleAvailability}
            onSave={handleSaveAvailability}
          />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTab stats={performanceStats} achievements={achievements} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
