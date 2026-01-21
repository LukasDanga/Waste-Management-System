import { ReactNode } from 'react';
import { 
  BarChart3, 
  Inbox, 
  Users, 
  User, 
  TrendingUp, 
  Award,
  Building2
} from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';

interface EnterpriseLayoutProps {
  children: ReactNode;
  currentSection: string;
  onNavigate: (section: string) => void;
  companyData: {
    name: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export function EnterpriseLayout({ 
  children, 
  currentSection, 
  onNavigate, 
  companyData,
  onLogout 
}: EnterpriseLayoutProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: BarChart3 },
    { id: 'requests', label: 'Yêu cầu thu gom', icon: Inbox },
    { id: 'collectors', label: 'Quản lý Collector', icon: Users },
    { id: 'capacity', label: 'Năng lực xử lý', icon: Building2 },
    { id: 'analytics', label: 'Báo cáo & Thống kê', icon: TrendingUp },
    { id: 'point-rules', label: 'Cấu hình điểm thưởng', icon: Award },
    { id: 'profile', label: 'Hồ sơ', icon: User }
  ];

  const logo = (
    <>
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
        <span className="text-lg">♻️</span>
      </div>
      <h1 className="text-xl font-bold text-blue-600 hidden sm:block">EcoWaste</h1>
    </>
  );

  return (
    <DashboardLayout
      headerProps={{
        logo,
        displayName: companyData.name,
        avatarLetter: companyData.name.charAt(0).toUpperCase(),
        avatarColor: 'bg-blue-600',
        notificationCount: 1,
      }}
      navbarProps={{
        menuItems,
        activeItemId: currentSection,
        onNavigate,
        brandColor: 'blue',
      }}
      onLogout={onLogout}
    >
      {children}
    </DashboardLayout>
  );
}