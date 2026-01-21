import { useState } from 'react';
import { MapPin, Clock, Navigation, Info, PlayCircle, Map } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface Task {
  id: string;
  reportId: string;
  address: string;
  type: string;
  weight: string;
  scheduledTime?: string;
  distance: string;
  status: 'pending' | 'on-the-way' | 'completed';
  image?: string;
}

interface MyTasksProps {
  onNavigate: (page: string, taskId?: string) => void;
}

export function MyTasks({ onNavigate }: MyTasksProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [sortBy, setSortBy] = useState<'distance' | 'time'>('distance');

  const pendingTasks: Task[] = [
    {
      id: '1',
      reportId: '#R20240112-005',
      address: '78 Nguyễn Huệ, Q1',
      type: 'Rác tái chế',
      weight: '15kg',
      scheduledTime: '14:00',
      distance: '2.3km',
      status: 'pending',
    },
    {
      id: '2',
      reportId: '#R20240112-007',
      address: '123 Pasteur, Q3',
      type: 'Rác tái chế',
      weight: '8kg',
      scheduledTime: '15:30',
      distance: '3.5km',
      status: 'pending',
    },
    {
      id: '3',
      reportId: '#R20240112-009',
      address: '56 Lý Tự Trọng, Q1',
      type: 'Rác hữu cơ',
      weight: '12kg',
      scheduledTime: '16:00',
      distance: '1.8km',
      status: 'pending',
    },
  ];

  const onTheWayTasks: Task[] = [
    {
      id: '4',
      reportId: '#R20240112-003',
      address: '45 Lê Lợi, Q1',
      type: 'Rác tái chế',
      weight: '10kg',
      scheduledTime: '13:00',
      distance: '1.2km',
      status: 'on-the-way',
    },
  ];

  const completedTasks: Task[] = [
    {
      id: '5',
      reportId: '#R20240112-001',
      address: '12 Đinh Tiên Hoàng, Q1',
      type: 'Rác hữu cơ',
      weight: '20kg',
      scheduledTime: '09:00',
      distance: '0km',
      status: 'completed',
    },
    {
      id: '6',
      reportId: '#R20240112-002',
      address: '89 Hai Bà Trưng, Q1',
      type: 'Rác tái chế',
      weight: '18kg',
      scheduledTime: '10:30',
      distance: '0km',
      status: 'completed',
    },
    {
      id: '7',
      reportId: '#R20240111-089',
      address: '234 Võ Văn Tần, Q3',
      type: 'Rác hữu cơ',
      weight: '14kg',
      scheduledTime: '11:45',
      distance: '0km',
      status: 'completed',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-medium">🟡 Chưa bắt đầu</span>;
      case 'on-the-way':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium">🔵 Đang đến</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-medium">✅ Hoàn thành</span>;
      default:
        return null;
    }
  };

  const renderTaskCard = (task: Task) => (
    <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-colors">
      <div className="flex gap-4">
        {/* Placeholder Image */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">♻️</span>
        </div>

        {/* Task Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900 mb-1">{task.reportId}</div>
              {getStatusBadge(task.status)}
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>{task.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">♻️</span>
              <span>{task.type} - {task.weight}</span>
            </div>
            {task.scheduledTime && (
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4 text-green-600" />
                <span>Giao lúc: {task.scheduledTime}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-700">
              <Navigation className="w-4 h-4 text-green-600" />
              <span>Khoảng cách: {task.distance}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {task.status === 'pending' && (
              <>
                <button
                  onClick={() => onNavigate('task-detail', task.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  Bắt đầu
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Chỉ đường
                </button>
                <button
                  onClick={() => onNavigate('task-detail', task.id)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Chi tiết
                </button>
              </>
            )}
            {task.status === 'on-the-way' && (
              <>
                <button
                  onClick={() => onNavigate('task-detail', task.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Cập nhật trạng thái
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Chỉ đường
                </button>
              </>
            )}
            {task.status === 'completed' && (
              <button
                onClick={() => onNavigate('task-detail', task.id)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                Xem chi tiết
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Công việc của tôi</h1>
        <p className="text-gray-600">Quản lý và theo dõi các công việc thu gom</p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSortBy('distance')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sortBy === 'distance'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Sắp xếp theo khoảng cách
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Map className="w-4 h-4" />
          Xem trên bản đồ
        </button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            🟡 Chờ thực hiện ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="on-the-way" className="flex items-center gap-2">
            🔵 Đang đến ({onTheWayTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            ✅ Hoàn thành hôm nay ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingTasks.map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="on-the-way">
          <div className="space-y-4">
            {onTheWayTasks.map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completedTasks.map(renderTaskCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
