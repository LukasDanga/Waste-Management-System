import { Clock, Info, MapPin, Navigation, PlayCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Task } from './types';

interface TaskCardProps {
  task: Task;
  onNavigate: (page: string, taskId?: string) => void;
}

export function TaskCard({ task, onNavigate }: TaskCardProps) {
  const renderActions = () => {
    if (task.status === 'pending') {
      return (
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
      );
    }

    if (task.status === 'on-the-way') {
      return (
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
      );
    }

    return (
      <button
        onClick={() => onNavigate('task-detail', task.id)}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
      >
        <Info className="w-4 h-4" />
        Xem chi tiết
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-colors">
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">♻️</span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900 mb-1">{task.reportId}</div>
              <StatusBadge status={task.status} />
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>{task.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">♻️</span>
              <span>
                {task.type} - {task.weight}
              </span>
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

          <div className="flex gap-2">{renderActions()}</div>
        </div>
      </div>
    </div>
  );
}
