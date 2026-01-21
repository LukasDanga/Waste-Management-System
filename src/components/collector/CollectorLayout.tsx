import { ReactNode } from 'react';
import { Home, ClipboardList, CheckSquare, BarChart3, User } from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';

interface CollectorLayoutProps {
  children: ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  collectorName: string;
  onLogout: () => void;
}

export function CollectorLayout({ children, activePage, onNavigate, collectorName, onLogout }: CollectorLayoutProps) {
  const menuItems = [
    { id: 'overview', label: 'Trang chủ', icon: Home },
    { id: 'tasks', label: 'Công việc của tôi', icon: ClipboardList },
    { id: 'history', label: 'Lịch sử hoàn thành', icon: CheckSquare },
    { id: 'stats', label: 'Thống kê cá nhân', icon: BarChart3 },
    { id: 'profile', label: 'Hồ sơ', icon: User },
  ];

  const logo = (
    <>
      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
        <span className="text-lg">♻️</span>
      </div>
      <h1 className="text-xl font-bold text-green-600 hidden sm:block">EcoWaste</h1>
    </>
  );

  return (
    <DashboardLayout
      headerProps={{
        logo,
        displayName: collectorName,
        avatarLetter: collectorName.charAt(0).toUpperCase(),
        avatarColor: 'bg-orange-600',
        notificationCount: 2,
      }}
      navbarProps={{
        menuItems,
        activeItemId: activePage,
        onNavigate,
        brandColor: 'orange',
      }}
      onLogout={onLogout}
    >
      {children}
    </DashboardLayout>
  );
}