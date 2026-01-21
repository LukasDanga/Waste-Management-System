import { useState } from 'react';
import { Award, Building2, FileText, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { CompanyInfoTab } from './CompanyInfoTab';
import { LicenseTab } from './LicenseTab';
import { PerformanceTab } from './PerformanceTab';
import { RepresentativeTab } from './RepresentativeTab';
import type { Achievement, EnterpriseProfile, LicenseItem, PerformanceStat } from './types';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<EnterpriseProfile>({
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

  const licenses: LicenseItem[] = [
    {
      title: 'Giấy phép kinh doanh',
      number: 'GPKD-2020-001234',
      issuedDate: '15/03/2020',
      issuer: 'Sở KH&ĐT TP.HCM',
      status: 'valid',
    },
    {
      title: 'Giấy phép thu gom rác thải',
      number: 'GPTG-2020-5678',
      issuedDate: '20/04/2020',
      issuer: 'Sở TN&MT TP.HCM',
      status: 'valid',
    },
    {
      title: 'Chứng nhận ISO 14001:2015',
      number: 'ISO-14001-2021',
      issuedDate: '10/06/2021',
      issuer: 'Tổ chức chứng nhận ISO',
      status: 'valid',
      note: 'Hết hạn: 10/06/2026',
    },
  ];

  const performanceStats: PerformanceStat[] = [
    { label: 'Tổng yêu cầu đã hoàn thành', value: '1,847', change: '↑ 12% so với tháng trước', tone: 'emerald' },
    { label: 'Tỷ lệ hoàn thành đúng hạn', value: '94.5%', change: '↑ 2.3% so với tháng trước', tone: 'blue' },
    { label: 'Đánh giá trung bình', value: '4.8/5.0', change: '⭐⭐⭐⭐⭐', tone: 'amber' },
  ];

  const achievements: Achievement[] = [
    {
      title: 'Doanh nghiệp xuất sắc tháng 11/2025',
      subtitle: 'Được bình chọn bởi hệ thống EcoWaste',
      iconColor: 'text-yellow-500',
    },
    {
      title: '100% yêu cầu hoàn thành đúng hạn',
      subtitle: 'Thành tựu đạt được trong tháng 10/2025',
      iconColor: 'text-emerald-500',
    },
  ];

  const handleFieldChange = (field: keyof EnterpriseProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Đã lưu thông tin doanh nghiệp thành công!');
  };

  const handleRepresentativeSave = () => {
    alert('Đã lưu thông tin người đại diện!');
  };

  const handleUploadLicense = () => {
    alert('Đang mở hộp thoại tải lên giấy phép mới');
  };

  const handleStartEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <div className="p-8">
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

        <TabsContent value="company">
          <CompanyInfoTab
            profileData={profileData}
            isEditing={isEditing}
            onFieldChange={handleFieldChange}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onSave={handleSaveProfile}
          />
        </TabsContent>

        <TabsContent value="representative">
          <RepresentativeTab profileData={profileData} onFieldChange={handleFieldChange} onSave={handleRepresentativeSave} />
        </TabsContent>

        <TabsContent value="license">
          <LicenseTab licenses={licenses} onUpload={handleUploadLicense} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTab stats={performanceStats} achievements={achievements} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
