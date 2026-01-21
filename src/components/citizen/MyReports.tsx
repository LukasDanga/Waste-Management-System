import { useState } from 'react';
import { Filter, Search, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface MyReportsProps {
  onNavigate: (section: string, data?: any) => void;
}

export function MyReports({ onNavigate }: MyReportsProps) {
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    time: '30'
  });

  const reports = [
    {
      id: '#R20260112-001',
      location: '123 Nguyễn Văn A, Q1',
      type: 'recyclable',
      typeLabel: '♻️ Rác tái chế',
      status: 'collected',
      statusLabel: 'Đã thu gom',
      points: '+15',
      date: '12/01/2026',
      image: 'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260111-045',
      location: '456 Trần Hưng Đạo, Q5',
      type: 'organic',
      typeLabel: '🌿 Rác hữu cơ',
      status: 'assigned',
      statusLabel: 'Đang thu gom',
      points: '+10',
      date: '11/01/2026',
      image: 'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260110-023',
      location: '789 Lê Lợi, Q3',
      type: 'general',
      typeLabel: '🗑️ Rác thông thường',
      status: 'pending',
      statusLabel: 'Chờ xử lý',
      points: '+8',
      date: '10/01/2026',
      image: 'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260109-056',
      location: '321 Hai Bà Trưng, Q1',
      type: 'recyclable',
      typeLabel: '♻️ Rác tái chế',
      status: 'accepted',
      statusLabel: 'Đã chấp nhận',
      points: '+12',
      date: '09/01/2026',
      image: 'https://images.unsplash.com/photo-1561069157-218187260215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY29sbGVjdGlvbiUyMHRydWNrfGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260108-034',
      location: '654 Võ Văn Tần, Q3',
      type: 'organic',
      typeLabel: '🌿 Rác hữu cơ',
      status: 'collected',
      statusLabel: 'Đã thu gom',
      points: '+10',
      date: '08/01/2026',
      image: 'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260107-012',
      location: '234 Cách Mạng Tháng 8, Q10',
      type: 'general',
      typeLabel: '🗑️ Rác thông thường',
      status: 'collected',
      statusLabel: 'Đã thu gom',
      points: '+8',
      date: '07/01/2026',
      image: 'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'assigned':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'collected':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Báo cáo của tôi</h1>
        <p className="text-gray-600">Quản lý và theo dõi các báo cáo rác thải của bạn</p>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold">Bộ lọc</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-9 bg-input-background"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="bg-input-background">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">🟡 Chờ xử lý</SelectItem>
                <SelectItem value="accepted">🟢 Đã chấp nhận</SelectItem>
                <SelectItem value="assigned">🔵 Đang thu</SelectItem>
                <SelectItem value="collected">✅ Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div>
            <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
              <SelectTrigger className="bg-input-background">
                <SelectValue placeholder="Loại rác" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="organic">🌿 Hữu cơ</SelectItem>
                <SelectItem value="recyclable">♻️ Tái chế</SelectItem>
                <SelectItem value="hazardous">⚠️ Nguy hại</SelectItem>
                <SelectItem value="general">🗑️ Thông thường</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Filter */}
          <div>
            <Select value={filters.time} onValueChange={(value) => setFilters({ ...filters, time: value })}>
              <SelectTrigger className="bg-input-background">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 ngày gần đây</SelectItem>
                <SelectItem value="30">30 ngày gần đây</SelectItem>
                <SelectItem value="90">90 ngày gần đây</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card 
            key={report.id} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('report-detail', report)}
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={report.image}
                  alt={report.typeLabel}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg">{report.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${getStatusColor(report.status)}`}>
                    {report.statusLabel}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">📍 {report.location}</p>
                  <p>{report.typeLabel}</p>
                  <div className="flex items-center gap-4 text-gray-500">
                    <span>⭐ {report.points} điểm</span>
                    <span>🕐 {report.date}</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm">Trước</Button>
        <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <Button variant="outline" size="sm">Sau</Button>
      </div>
    </div>
  );
}
