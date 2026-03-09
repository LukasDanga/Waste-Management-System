import { ReactNode } from 'react';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  Gift, 
  Trophy, 
  MessageSquare, 
  User
} from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';
import { Badge } from '../ui/badge';

interface CitizenLayoutProps {
  children: ReactNode;
  currentSection: string;
  onNavigate: (section: string) => void;
  userData: {
    name: string;
    points: number;
    avatar?: string;
  };
  onLogout: () => void;
}

export function CitizenLayout({ 
  children, 
  currentSection, 
  onNavigate, 
  userData,
  onLogout 
}: CitizenLayoutProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'create-report', label: 'Tạo báo cáo', icon: PlusCircle },
    { id: 'my-reports', label: 'Báo cáo của tôi', icon: FileText },
    { id: 'points', label: 'Điểm thưởng', icon: Gift },
    { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Trophy },
    { id: 'profile', label: 'Hồ sơ', icon: User }
  ];

  const logo = (
    <>
      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
        <span className="text-lg">♻️</span>
      </div>
      <h1 className="text-xl font-bold text-green-600 hidden sm:block">EcoWaste</h1>
    </>
  );

  const pointsBadge = (
    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 px-3 py-1.5 text-sm font-medium">
      ⭐ {userData.points.toLocaleString()} điểm
    </Badge>
  );

  return (
    <DashboardLayout
      headerProps={{
        logo,
        displayName: userData.name,
        avatarLetter: userData.name.charAt(0).toUpperCase(),
        avatarColor: 'bg-green-600',
        additionalContent: pointsBadge,
        notificationCount: 1,
      }}
      navbarProps={{
        menuItems,
        activeItemId: currentSection,
        onNavigate,
        brandColor: 'green',
      }}
      onLogout={onLogout}
    >
      {children}
    </DashboardLayout>
  );
}