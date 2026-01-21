import { Users, Building2, ClipboardList, AlertCircle, Weight, TrendingUp, UserPlus, AlertTriangle, FileText } from 'lucide-react';
import { ActivityChart } from './ActivityChart';
import { RoleDistributionChart } from './RoleDistributionChart';
import { TopMetrics } from './TopMetrics';
import { UserTrendChart } from './UserTrendChart';
import { RecentActivities } from './RecentActivities';
import type { MetricItem, TrendPoint, ActivityPoint, RoleDistributionItem, RecentActivityItem } from './types';

export function DashboardOverview() {
  const topMetrics: MetricItem[] = [
    {
      label: 'Tổng người dùng',
      value: '15,847',
      change: '+12.5%',
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Doanh nghiệp hoạt động',
      value: '48',
      change: '+3',
      icon: Building2,
      color: 'green',
    },
    {
      label: 'Báo cáo hôm nay',
      value: '234',
      change: '+18%',
      icon: ClipboardList,
      color: 'orange',
    },
    {
      label: 'Khiếu nại chưa giải quyết',
      value: '7',
      change: '-2',
      icon: AlertCircle,
      color: 'red',
    },
    {
      label: 'Tổng khối lượng (tháng)',
      value: '128 tấn',
      change: '+22%',
      icon: Weight,
      color: 'purple',
    },
    {
      label: 'Tỷ lệ hoàn thành',
      value: '94.2%',
      change: '+1.8%',
      icon: TrendingUp,
      color: 'teal',
    },
  ];

  const userTrendData: TrendPoint[] = [
    { month: 'T7', users: 12000 },
    { month: 'T8', users: 12800 },
    { month: 'T9', users: 13500 },
    { month: 'T10', users: 14200 },
    { month: 'T11', users: 14900 },
    { month: 'T12', users: 15500 },
    { month: 'T1', users: 15847 },
  ];

  const activityData: ActivityPoint[] = [
    { day: 'T2', reports: 180 },
    { day: 'T3', reports: 220 },
    { day: 'T4', reports: 195 },
    { day: 'T5', reports: 250 },
    { day: 'T6', reports: 234 },
    { day: 'T7', reports: 150 },
    { day: 'CN', reports: 120 },
  ];

  const roleDistribution: RoleDistributionItem[] = [
    { name: 'Người dân', value: 14500, color: '#3b82f6' },
    { name: 'Doanh nghiệp', value: 850, color: '#10b981' },
    { name: 'Nhân viên thu gom', value: 420, color: '#f59e0b' },
    { name: 'Quản trị viên', value: 77, color: '#8b5cf6' },
  ];

  const recentActivities: RecentActivityItem[] = [
    { type: 'signup', icon: UserPlus, text: '23 người dùng mới đăng ký', time: '5 phút trước', color: 'blue' },
    { type: 'urgent', icon: AlertTriangle, text: 'Báo cáo khẩn cấp #R20240112-089', time: '15 phút trước', color: 'red' },
    { type: 'complaint', icon: AlertCircle, text: 'Khiếu nại mới #C-012', time: '1 giờ trước', color: 'orange' },
    { type: 'enterprise', icon: Building2, text: 'Doanh nghiệp "Eco Solutions" đăng ký', time: '2 giờ trước', color: 'green' },
    { type: 'report', icon: FileText, text: '156 báo cáo được xử lý thành công', time: '3 giờ trước', color: 'purple' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tổng quan hệ thống</h1>
        <p className="text-gray-600">Giám sát và quản lý toàn bộ hệ thống EcoWaste</p>
      </div>

      {/* Top Metrics */}
      <TopMetrics metrics={topMetrics} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserTrendChart data={userTrendData} />
        <ActivityChart data={activityData} />
      </div>

      {/* Role Distribution & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoleDistributionChart data={roleDistribution} />
        <RecentActivities activities={recentActivities} />
      </div>
    </div>
  );
}
