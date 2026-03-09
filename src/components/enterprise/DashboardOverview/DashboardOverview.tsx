import { Inbox, Clock, CheckCircle, Package, Eye, Users, FileText } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      label: 'Yêu cầu mới hôm nay',
      value: '23',
      icon: Inbox,
      color: 'bg-blue-100 text-blue-600',
      trend: '+5 so với hôm qua'
    },
    {
      label: 'Đang xử lý',
      value: '47',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '12 đã phân công'
    },
    {
      label: 'Hoàn thành tháng này',
      value: '1,248',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      trend: '+18% so với tháng trước'
    },
    {
      label: 'Tổng khối lượng (tấn)',
      value: '82.5',
      icon: Package,
      color: 'bg-purple-100 text-purple-600',
      trend: '82% capacity'
    }
  ];

  const weeklyData = [
    { name: 'T2', organic: 4.2, recyclable: 8.5, general: 5.3 },
    { name: 'T3', organic: 3.8, recyclable: 9.2, general: 4.8 },
    { name: 'T4', organic: 5.1, recyclable: 10.3, general: 6.2 },
    { name: 'T5', organic: 4.5, recyclable: 8.9, general: 5.7 },
    { name: 'T6', organic: 6.2, recyclable: 11.5, general: 7.1 },
    { name: 'T7', organic: 5.8, recyclable: 10.8, general: 6.5 },
    { name: 'CN', organic: 3.2, recyclable: 7.1, general: 4.2 }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tổng quan hệ thống 📊</h1>
        <p className="text-gray-600">Theo dõi và quản lý hoạt động thu gom rác thải</p>
      </div>

      {/* Top Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.trend}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Khối lượng rác theo tuần</h2>
          <Select defaultValue="week">
            <SelectTrigger className="w-40 bg-input-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Tấn', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="organic" name="Hữu cơ" fill="#10b981" />
            <Bar dataKey="recyclable" name="Tái chế" fill="#3b82f6" />
            <Bar dataKey="general" name="Thông thường" fill="#6b7280" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Thao tác nhanh</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
            onClick={() => onNavigate('requests')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Xem yêu cầu mới</h3>
                <p className="text-sm text-gray-600">23 yêu cầu đang chờ</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
            onClick={() => onNavigate('collectors')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quản lý Collector</h3>
                <p className="text-sm text-gray-600">15 người đang hoạt động</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
            onClick={() => onNavigate('analytics')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Xem báo cáo</h3>
                <p className="text-sm text-gray-600">Phân tích chi tiết</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Hoạt động gần đây</h2>
        <div className="space-y-3">
          {[
            { time: '5 phút trước', action: 'Nguyễn Văn B đã hoàn thành yêu cầu #R20260112-045', type: 'success' },
            { time: '15 phút trước', action: 'Yêu cầu mới #R20260112-078 từ Quận 1', type: 'info' },
            { time: '32 phút trước', action: 'Trần Văn C đang thu gom tại 456 Lê Lợi', type: 'warning' },
            { time: '1 giờ trước', action: 'Hoàn thành 12 yêu cầu trong buổi sáng', type: 'success' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
