import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { getMyCollectionTasks } from '../../../services/collectionService';
import { Filters, StatusOption } from '../../shared/Filters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { QuickActions } from './QuickActions';
import { TaskCard } from './TaskCard';
import type { MyTasksProps, Task, TaskStatus } from './types';
import { STATUS_CODE_MAP } from './types';

export function MyTasks({ onNavigate }: MyTasksProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [sortBy, setSortBy] = useState<'distance' | 'time'>('distance');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { error: toastError } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMyCollectionTasks({ PageIndex: 0, PageLength: 100 });
        if (res.success) {
          const mapped: Task[] = res.payload.map((item) => ({
            collectionTaskID: item.collectionTaskID,
            collectionReportID: item.collectionReportID,
            note: item.note,
            imageName: item.imageName,
            amountEstimated: item.amountEstimated,
            statusCode: item.status,
            status: STATUS_CODE_MAP[item.status] ?? 'pending',
            assignedAt: item.assignedAt,
            startedAt: item.startedAt,
            completedAt: item.completedAt,
            collectorProfileID: item.collectorProfileID,
          }));
          setTasks(mapped);
        }
      } catch (err: any) {
        const msg = err?.message || 'Không thể tải danh sách công việc';
        setError(msg);
        toastError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const pendingTasks = useMemo(() => tasks.filter((t) => t.status === 'pending'), [tasks]);
  const onTheWayTasks = useMemo(() => tasks.filter((t) => t.status === 'on-the-way'), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.status === 'completed'), [tasks]);

  const statusOptions: StatusOption[] = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: '🟡 Chưa bắt đầu' },
    { value: 'on-the-way', label: '🔵 Đang đến' },
    { value: 'completed', label: '✅ Hoàn thành' },
  ];

  const filterTasks = (list: Task[]) =>
    list.filter((task) => {
      const matchesSearch =
        !searchTerm ||
        task.collectionTaskID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.collectionReportID.toLowerCase().includes(searchTerm.toLowerCase());
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

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="text-gray-500">Đang tải công việc...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

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
          searchPlaceholder="Nhập mã task hoặc mã báo cáo..."
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
            ✅ Hoàn thành ({filteredCompleted.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {filteredPending.length === 0 ? (
              <div className="text-gray-500 text-center py-8">Không có công việc chờ thực hiện</div>
            ) : (
              filteredPending.map((task) => (
                <TaskCard key={task.collectionTaskID} task={task} onNavigate={onNavigate} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="on-the-way">
          <div className="space-y-4">
            {filteredOnTheWay.length === 0 ? (
              <div className="text-gray-500 text-center py-8">Không có công việc đang thực hiện</div>
            ) : (
              filteredOnTheWay.map((task) => (
                <TaskCard key={task.collectionTaskID} task={task} onNavigate={onNavigate} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {filteredCompleted.length === 0 ? (
              <div className="text-gray-500 text-center py-8">Không có công việc đã hoàn thành</div>
            ) : (
              filteredCompleted.map((task) => (
                <TaskCard key={task.collectionTaskID} task={task} onNavigate={onNavigate} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

