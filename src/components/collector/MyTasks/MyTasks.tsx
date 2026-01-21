import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { QuickActions } from './QuickActions';
import { TaskCard } from './TaskCard';
import type { MyTasksProps, Task } from './types';

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
            {pendingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="on-the-way">
          <div className="space-y-4">
            {onTheWayTasks.map((task) => (
              <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
