import { ReactNode } from 'react';
import { BarChart3, Users, Building2, ClipboardList, AlertTriangle, Shield, FileText, User } from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';

interface AdminLayoutProps {
  children: ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  adminName: string;
  onLogout: () => void;
}

export function AdminLayout({ children, activePage, onNavigate, adminName, onLogout }: AdminLayoutProps) {
  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'enterprises', label: 'Quản lý doanh nghiệp', icon: Building2 },
    { id: 'reports', label: 'Giám sát báo cáo', icon: ClipboardList },
    { id: 'disputes', label: 'Khiếu nại & Tranh chấp', icon: AlertTriangle },
    { id: 'permissions', label: 'Phân quyền', icon: Shield },
    { id: 'comprehensive', label: 'Báo cáo tổng hợp', icon: FileText },
    { id: 'profile', label: 'Hồ sơ', icon: User },
  ];

  const logo = (
    <>
      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
        <span className="text-lg">♻️</span>
      </div>
      <h1 className="text-xl font-bold text-purple-600 hidden sm:block">EcoWaste</h1>
    </>
  );

  return (
    <DashboardLayout
      headerProps={{
        logo,
        displayName: adminName,
        avatarLetter: adminName.charAt(0).toUpperCase(),
        avatarColor: 'bg-purple-600',
        notificationCount: 3,
      }}
      navbarProps={{
        menuItems,
        activeItemId: activePage,
        onNavigate,
        brandColor: 'purple',
      }}
      onLogout={onLogout}
    >
      {children}
    </DashboardLayout>
  );
}