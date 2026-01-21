import { useState } from 'react';
import { MapPin, Clock, CheckCircle2, XCircle, Calendar, TrendingUp, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface HistoryItem {
  id: string;
  reportId: string;
  date: string;
  time: string;
  address: string;
  type: string;
  weight: string;
  duration: string;
  status: 'completed' | 'cancelled';
  rating?: number;
}

interface WorkHistoryProps {
  onNavigate: (page: string, taskId?: string) => void;
}

export function WorkHistory({ onNavigate }: WorkHistoryProps) {
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');

  const history: HistoryItem[] = [
    {
      id: '1',
      reportId: '#R20240111-023',
      date: '11/01/2026',
      time: '14:30',
      address: '123 Pasteur, Q1',
      type: 'Rác tái chế',
      weight: '12kg',
      duration: '25 phút',
      status: 'completed',
      rating: 5,
    },
    {
      id: '2',
      reportId: '#R20240111-021',
      date: '11/01/2026',
      time: '13:15',
      address: '45 Lê Lợi, Q1',
      type: 'Rác hữu cơ',
      weight: '18kg',
      duration: '30 phút',
      status: 'completed',
      rating: 5,
    },
    {
      id: '3',
      reportId: '#R20240111-019',
      date: '11/01/2026',
      time: '11:00',
      address: '78 Nguyễn Huệ, Q3',
      type: 'Rác tái chế',
      weight: '8kg',
      duration: '20 phút',
      status: 'completed',
      rating: 4,
    },
    {
      id: '4',
      reportId: '#R20240111-015',
      date: '11/01/2026',
      time: '09:30',
      address: '234 Võ Văn Tần, Q3',
      type: 'Rác hữu cơ',
      weight: '15kg',
      duration: '28 phút',
      status: 'completed',
      rating: 5,
    },
    {
      id: '5',
      reportId: '#R20240110-089',
      date: '10/01/2026',
      time: '16:45',
      address: '56 Lý Tự Trọng, Q1',
      type: 'Rác tái chế',
      weight: '10kg',
      duration: '22 phút',
      status: 'completed',
      rating: 4,
    },
    {
      id: '6',
      reportId: '#R20240110-085',
      date: '10/01/2026',
      time: '15:20',
      address: '167 Hai Bà Trưng, Q1',
      type: 'Rác nguy hại',
      weight: '5kg',
      duration: '0 phút',
      status: 'cancelled',
    },
  ];

  const stats = {
    total: 125,
    completionRate: 98,
    avgTime: 24,
    avgRating: 4.8,
  };

  const filteredHistory = history.filter((item) => {
    if (statusFilter === 'completed' && item.status !== 'completed') return false;
    if (statusFilter === 'cancelled' && item.status !== 'cancelled') return false;
    // Date filtering would be implemented here
    return true;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử hoàn thành</h1>
        <p className="text-gray-600">Xem lại các công việc đã thực hiện</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tổng công việc</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tỷ lệ hoàn thành</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.completionRate}%</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Thời gian TB</span>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.avgTime} phút</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Đánh giá TB</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.avgRating} ⭐</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Ngày
            </label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="7days">7 ngày</SelectItem>
                <SelectItem value="30days">30 ngày</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {item.status === 'completed' ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900 mb-1">{item.reportId}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date} {item.time}</span>
                  </div>
                </div>
              </div>
              {item.status === 'completed' ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-medium">
                  ✅ Hoàn thành
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-medium">
                  ❌ Đã hủy
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>{item.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600">♻️</span>
                <span>{item.type} - {item.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-green-600" />
                <span>Thời gian: {item.duration}</span>
              </div>
              {item.rating && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{item.rating} sao</span>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('task-detail', item.id)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không có lịch sử công việc nào</p>
        </div>
      )}
    </div>
  );
}
