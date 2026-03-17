import { ArrowLeft, Calendar, CheckCircle, Clock, Hash, Loader2, Upload, User } from 'lucide-react';
import { useState } from 'react';
import { API_CONFIG } from '../../../config/api.config';
import { useToast } from '../../../hooks/useToast';
import { uploadReportImage } from '../../../services/citizenService';
import { submitProof } from '../../../services/collectionService';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { StatusBadge } from './StatusBadge';
import type { Task } from './types';

interface TaskDetailProps {
  taskId: string;
  task: Task | null;
  onNavigate: (page: string) => void;
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

export function TaskDetail({ taskId, task, onNavigate }: TaskDetailProps) {
  const [amountEstimated, setAmountEstimated] = useState(
    task?.amountEstimated ? String(task.amountEstimated) : ''
  );
  const [note, setNote] = useState(task?.note ?? '');
  const [proofImageName, setProofImageName] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setProofFile(file);
    setProofImageName('');
    try {
      setUploading(true);
      const name = await uploadReportImage(file, 'CollectionReport');
      setProofImageName(name);
      toastSuccess('Tải ảnh lên thành công');
    } catch (err: any) {
      toastError(err?.message || 'Tải ảnh lên thất bại');
      setProofFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProof = async () => {
    if (!proofImageName) {
      toastError('Vui lòng upload ảnh xác nhận');
      return;
    }
    if (!amountEstimated || Number(amountEstimated) <= 0) {
      toastError('Vui lòng nhập khối lượng thực tế');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitProof({
        collectionTaskID: taskId,
        imageName: proofImageName,
        amountEstimated: Number(amountEstimated),
        note: note,
      });
      if (res.success) {
        toastSuccess(res.payload || 'Đã nộp bằng chứng hoàn thành thành công!');
        onNavigate('tasks');
      }
    } catch (err: any) {
      toastError(err?.message || 'Không thể nộp bằng chứng. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!task) {
    return (
      <div className="p-8">
        <button
          onClick={() => onNavigate('tasks')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại danh sách</span>
        </button>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-yellow-700">
          Không tìm thấy thông tin công việc.
        </div>
      </div>
    );
  }

  const isCompleted = task.status === 'completed';
  const canSubmitProof = task.status === 'on-the-way' || task.status === 'pending';

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('tasks')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Quay lại danh sách</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chi tiết công việc</h1>
        <div className="flex items-center gap-3">
          <span className="text-lg font-mono text-green-600">
            #{task.collectionTaskID.split('-')[0].toUpperCase()}
          </span>
          <StatusBadge status={task.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column – Task Info */}
        <div className="space-y-6">

          {/* Proof Image (if submitted) */}
          {task.imageName && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Ảnh xác nhận đã nộp</h2>
              <img
                src={`${API_CONFIG.IMAGE_BASE_URL}/${task.imageName}`}
                alt="Proof"
                className="w-full h-64 object-cover rounded-lg bg-gray-100"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://placehold.co/600x300?text=Không+tải+được+ảnh';
                }}
              />
              <p className="text-xs text-gray-400 mt-2 truncate">{task.imageName}</p>
            </div>
          )}

          {/* Task IDs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Thông tin công việc</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-500 mb-0.5">Task ID</div>
                  <div className="font-mono text-gray-900 break-all">{task.collectionTaskID}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-500 mb-0.5">Report ID</div>
                  <div className="font-mono text-gray-900 break-all">{task.collectionReportID}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 mb-0.5">Collector Profile ID</div>
                  <div className="font-mono text-gray-900 break-all">{task.collectorProfileID}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Thời gian</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 mb-0.5">Được giao lúc</div>
                  <div className="font-medium text-gray-900">{formatDate(task.assignedAt)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 mb-0.5">Bắt đầu lúc</div>
                  <div className={`font-medium ${task.startedAt.startsWith('0001') ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                    {formatDate(task.startedAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 mb-0.5">Hoàn thành lúc</div>
                  <div className={`font-medium ${!task.completedAt ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                    {task.completedAt ? formatDate(task.completedAt) : 'Chưa hoàn thành'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amount & Note */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Khối lượng & Ghi chú</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Khối lượng ước tính: </span>
                <span className="font-medium text-gray-900">
                  {task.amountEstimated > 0 ? `${task.amountEstimated} kg` : '—'}
                </span>
              </div>
              {task.note ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-gray-500 mb-1">Ghi chú ban đầu</div>
                  <div className="text-gray-900">{task.note}</div>
                </div>
              ) : (
                <div className="text-gray-400 italic">Không có ghi chú</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column – Submit Proof */}
        <div className="space-y-6">
          {isCompleted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="font-semibold text-gray-900">Công việc đã hoàn thành</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Công việc này đã được hoàn thành vào {formatDate(task.completedAt!)}.
              </p>
            </div>
          ) : canSubmitProof ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Nộp bằng chứng hoàn thành</h2>

              <div className="space-y-6">
                {/* Upload Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📸 Ảnh xác nhận thu gom <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="proof-image"
                    />
                    <label htmlFor="proof-image" className="cursor-pointer">
                      {uploading ? (
                        <div>
                          <Loader2 className="w-10 h-10 text-green-600 mx-auto mb-2 animate-spin" />
                          <p className="text-sm text-green-600">Đang tải ảnh lên...</p>
                        </div>
                      ) : proofFile && proofImageName ? (
                        <div>
                          <Upload className="w-10 h-10 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600 font-medium">{proofFile.name}</p>
                          <p className="text-xs text-gray-400 mt-1">✅ Đã upload • Click để chọn ảnh khác</p>
                        </div>
                      ) : proofFile && !proofImageName ? (
                        <div>
                          <Upload className="w-10 h-10 text-red-400 mx-auto mb-2" />
                          <p className="text-sm text-red-500">{proofFile.name}</p>
                          <p className="text-xs text-gray-400 mt-1">Upload thất bại • Click để thử lại</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click để upload ảnh</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG lên đến 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>

                </div>

                {/* Actual Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⚖️ Khối lượng thực tế (kg) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      value={amountEstimated}
                      onChange={(e) => setAmountEstimated(e.target.value)}
                      placeholder="Nhập khối lượng"
                      className="flex-1"
                    />
                    <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-sm">
                      kg
                    </span>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Ghi chú
                  </label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Nhập ghi chú về quá trình thu gom..."
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitProof}
                    disabled={submitting || uploading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {submitting ? 'Đang nộp...' : '✅ Nộp bằng chứng'}
                  </button>
                  <button
                    onClick={() => onNavigate('tasks')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

