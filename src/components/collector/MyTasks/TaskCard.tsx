import { Calendar, CheckCircle, Clock, Hash, Info, Navigation, PlayCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Task } from './types';

interface TaskCardProps {
  task: Task;
  onNavigate: (page: string, taskId?: string, task?: Task) => void;
}

function formatDate(isoString: string): string {
  if (!isoString || isoString.startsWith('0001')) return '—';
  return new Date(isoString).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TaskCard({ task, onNavigate }: TaskCardProps) {
  const shortId = (id: string) => id.split('-')[0].toUpperCase();

  const renderActions = () => {
    if (task.status === 'pending') {
      return (
        <>
          <button
            onClick={() => onNavigate('task-detail', task.collectionTaskID, task)}
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
            onClick={() => onNavigate('task-detail', task.collectionTaskID, task)}
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
            onClick={() => onNavigate('task-detail', task.collectionTaskID, task)}
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
        onClick={() => onNavigate('task-detail', task.collectionTaskID, task)}
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
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">♻️</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900 mb-1">
                Task #{shortId(task.collectionTaskID)}
              </div>
              <StatusBadge status={task.status} />
            </div>
            {task.amountEstimated > 0 && (
              <span className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg whitespace-nowrap">
                ~{task.amountEstimated} kg
              </span>
            )}
          </div>

          <div className="space-y-1.5 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Hash className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="truncate">
                <span className="text-gray-400 mr-1">Task ID:</span>
                {task.collectionTaskID}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Hash className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="truncate">
                <span className="text-gray-400 mr-1">Report ID:</span>
                {task.collectionReportID}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>
                <span className="text-gray-400 mr-1">Giao lúc:</span>
                {formatDate(task.assignedAt)}
              </span>
            </div>
            {!task.startedAt.startsWith('0001') && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>
                  <span className="text-gray-400 mr-1">Bắt đầu:</span>
                  {formatDate(task.startedAt)}
                </span>
              </div>
            )}
            {task.completedAt && (
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>
                  <span className="text-gray-400 mr-1">Hoàn thành:</span>
                  {formatDate(task.completedAt)}
                </span>
              </div>
            )}
            {task.note && (
              <div className="flex items-start gap-2 text-gray-600">
                <span className="text-green-600 flex-shrink-0">📝</span>
                <span className="line-clamp-2">{task.note}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">{renderActions()}</div>
        </div>
      </div>
    </div>
  );
}

