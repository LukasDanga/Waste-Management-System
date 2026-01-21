import { MapPin, Navigation, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface Task {
  id: string;
  reportId: string;
  address: string;
  type: string;
  weight: string;
  distance: string;
  status: 'assigned' | 'on-the-way' | 'in-progress';
  statusLabel: string;
}

interface DashboardOverviewProps {
  onNavigate: (page: string, taskId?: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      label: 'Công việc hôm nay',
      value: '8',
      icon: Clock,
      color: 'blue',
    },
    {
      label: 'Đã hoàn thành',
      value: '3',
      icon: CheckCircle2,
      color: 'green',
    },
    {
      label: 'Đang thực hiện',
      value: '1',
      icon: PlayCircle,
      color: 'orange',
    },
  ];

  const currentTasks: Task[] = [
    {
      id: '1',
      reportId: '#R20240112-003',
      address: '45 Lê Lợi, Q1',
      type: 'Rác tái chế',
      weight: '10kg',
      distance: '1.2km',
      status: 'in-progress',
      statusLabel: 'ĐANG THỰC HIỆN',
    },
    {
      id: '2',
      reportId: '#R20240112-005',
      address: '78 Nguyễn Huệ, Q1',
      type: 'Rác hữu cơ',
      weight: '15kg',
      distance: '2.3km',
      status: 'assigned',
      statusLabel: 'CHỜ THỰC HIỆN',
    },
    {
      id: '3',
      reportId: '#R20240112-007',
      address: '123 Pasteur, Q3',
      type: 'Rác tái chế',
      weight: '8kg',
      distance: '3.5km',
      status: 'assigned',
      statusLabel: 'CHỜ THỰC HIỆN',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'on-the-way':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trang chủ</h1>
        <p className="text-gray-600">Chào mừng trở lại! Đây là công việc của bạn hôm nay.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            orange: 'bg-orange-50 text-orange-600',
          }[stat.color];

          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Map View */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Bản đồ công việc
        </h2>
        <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          {/* Map placeholder */}
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Bản đồ hiển thị các địa điểm thu gom</p>
            <p className="text-sm text-gray-400 mt-1">Vị trí hiện tại và các điểm đến được đánh dấu</p>
          </div>
          
          {/* Map pins overlay */}
          <div className="absolute top-8 left-8 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Vị trí của bạn</span>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 text-sm mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Đang thực hiện</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span>Chờ thực hiện</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Danh sách công việc</h2>
          <button
            onClick={() => onNavigate('tasks')}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="space-y-4">
          {currentTasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-2 ${getStatusColor(task.status)}`}>
                    {task.status === 'in-progress' && '🟢'}
                    {task.status === 'assigned' && '🟡'}
                    {task.statusLabel}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{task.reportId}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{task.address} ({task.distance})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>♻️</span>
                  <span>{task.type} - {task.weight}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onNavigate('task-detail', task.id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  {task.status === 'in-progress' ? 'Cập nhật trạng thái' : 'Bắt đầu'}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Chỉ đường
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
