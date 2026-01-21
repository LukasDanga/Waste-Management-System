import { Camera, Map, FileText, CheckCircle, Clock, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      label: 'Tổng báo cáo',
      value: '157',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Đã thu gom',
      value: '142',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Đang chờ xử lý',
      value: '8',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Điểm tháng này',
      value: '+385',
      icon: Star,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại! 👋</h1>
        <p className="text-gray-600">Cùng nhau bảo vệ môi trường xanh sạch đẹp</p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card 
          className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate('create-report')}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Camera className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Báo cáo rác mới</h3>
              <p className="text-green-50 text-sm">Chụp ảnh và gửi báo cáo ngay</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 border-2 border-green-200 cursor-pointer hover:shadow-lg transition-shadow bg-white"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Map className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Xem bản đồ thu gom</h3>
              <p className="text-gray-600 text-sm">Tìm điểm thu gom gần bạn</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Thống kê của bạn</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Báo cáo gần đây</h2>
          <Button 
            variant="ghost" 
            className="text-green-600"
            onClick={() => onNavigate('my-reports')}
          >
            Xem tất cả →
          </Button>
        </div>

        <div className="grid gap-4">
          {[
            {
              id: '#R20260112-001',
              location: '123 Nguyễn Văn A, Q1',
              type: '♻️ Rác tái chế',
              status: 'collected',
              statusText: 'Đã thu gom',
              points: '+15',
              date: '12/01/2026',
              image: 'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: '#R20260111-045',
              location: '456 Trần Hưng Đạo, Q5',
              type: '🌿 Rác hữu cơ',
              status: 'assigned',
              statusText: 'Đang thu gom',
              points: '+10',
              date: '11/01/2026',
              image: 'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: '#R20260110-023',
              location: '789 Lê Lợi, Q3',
              type: '🗑️ Rác thông thường',
              status: 'pending',
              statusText: 'Chờ xử lý',
              points: '+8',
              date: '10/01/2026',
              image: 'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
            }
          ].map((report) => (
            <Card key={report.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-4">
                <img 
                  src={report.image} 
                  alt={report.type}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{report.id}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        report.status === 'collected'
                          ? 'bg-green-100 text-green-700'
                          : report.status === 'assigned'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {report.statusText}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">📍 {report.location}</p>
                  <p className="text-sm mb-1">{report.type}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>⭐ {report.points} điểm</span>
                    <span>🕐 {report.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div>
            <h3 className="font-semibold mb-2">Mẹo nhỏ</h3>
            <p className="text-sm text-gray-700">
              Phân loại rác đúng cách sẽ giúp bạn nhận được nhiều điểm thưởng hơn! 
              Hãy chụp ảnh rõ ràng và cung cấp thông tin chi tiết.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
