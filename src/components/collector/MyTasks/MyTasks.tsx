import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Filters, StatusOption } from '../../shared/Filters';
import { QuickActions } from './QuickActions';
import { TaskCard } from './TaskCard';
import type { MyTasksProps, Task, TaskStatus } from './types';

export function MyTasks({ onNavigate }: MyTasksProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [sortBy, setSortBy] = useState<'distance' | 'time'>('distance');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

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

  const statusOptions: StatusOption[] = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: '🟡 Chưa bắt đầu' },
    { value: 'on-the-way', label: '🔵 Đang đến' },
    { value: 'completed', label: '✅ Hoàn thành' },
  ];

  const filterTasks = (tasks: Task[]) =>
    tasks.filter((task) => {
      const matchesSearch =
        !searchTerm ||
        task.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const filteredPending = useMemo(() => filterTasks(pendingTasks), [pendingTasks, searchTerm, statusFilter]);
  const filteredOnTheWay = useMemo(() => filterTasks(onTheWayTasks), [onTheWayTasks, searchTerm, statusFilter]);
  const filteredCompleted = useMemo(() => filterTasks(completedTasks), [completedTasks, searchTerm, statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Công việc của tôi</h1>
        <p className="text-gray-600">Quản lý và theo dõi các công việc thu gom</p>
      </div>

      <QuickActions
        sortBy={sortBy}
        onSortChange={setSortBy}
        onViewMap={() => alert('Tính năng bản đồ sẽ sớm khả dụng')}
      />

      <div className="mb-6">
        <Filters
          searchLabel="Tìm kiếm"
          searchPlaceholder="Nhập mã báo cáo hoặc địa chỉ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          statusLabel="Trạng thái"
          statusValue={statusFilter}
          statusOptions={statusOptions}
          onStatusChange={(value) => setStatusFilter(value as TaskStatus | 'all')}
          className="mb-2"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <X className="w-4 h-4" />
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            🟡 Chờ thực hiện ({filteredPending.length})
          </TabsTrigger>
          <TabsTrigger value="on-the-way" className="flex items-center gap-2">
            🔵 Đang đến ({filteredOnTheWay.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            ✅ Hoàn thành hôm nay ({filteredCompleted.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {filteredPending.map((task) => (
              <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="on-the-way">
          <div className="space-y-4">
            {filteredOnTheWay.map((task) => (
              <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {filteredCompleted.map((task) => (
              <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
