import { Camera, Map, FileText, CheckCircle, Clock, Star } from 'lucide-react';
import { QuickActions } from './QuickActions';
import { StatsGrid } from './StatsGrid';
import { RecentReports } from './RecentReports';
import { TipsCard } from './TipsCard';
import type { DashboardStat, QuickAction, RecentReport } from './types';

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats: DashboardStat[] = [
    { label: 'Tổng báo cáo', value: '157', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { label: 'Đã thu gom', value: '142', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Đang chờ xử lý', value: '8', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Điểm tháng này', value: '+385', icon: Star, color: 'bg-purple-100 text-purple-600' }
  ];

  const actions: QuickAction[] = [
    {
      title: 'Báo cáo rác mới',
      subtitle: 'Chụp ảnh và gửi báo cáo ngay',
      icon: Camera,
      style: 'primary',
      onClick: () => onNavigate('create-report')
    },
    {
      title: 'Xem bản đồ thu gom',
      subtitle: 'Tìm điểm thu gom gần bạn',
      icon: Map,
      style: 'outline'
    }
  ];

  const recentReports: RecentReport[] = [
    {
      id: '#R20260112-001',
      location: '123 Nguyễn Văn A, Q1',
      type: '♻️ Rác tái chế',
      status: 'collected',
      statusText: 'Đã thu gom',
      points: '+15',
      date: '12/01/2026',
      image:
        'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260111-045',
      location: '456 Trần Hưng Đạo, Q5',
      type: '🌿 Rác hữu cơ',
      status: 'assigned',
      statusText: 'Đang thu gom',
      points: '+10',
      date: '11/01/2026',
      image:
        'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260110-023',
      location: '789 Lê Lợi, Q3',
      type: '🗑️ Rác thông thường',
      status: 'pending',
      statusText: 'Chờ xử lý',
      points: '+8',
      date: '10/01/2026',
      image:
        'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại! 👋</h1>
        <p className="text-gray-600">Cùng nhau bảo vệ môi trường xanh sạch đẹp</p>
      </div>

      <QuickActions actions={actions} />

      <StatsGrid stats={stats} />

      <RecentReports reports={recentReports} onSeeAll={() => onNavigate('my-reports')} />

      <TipsCard />
    </div>
  );
}
