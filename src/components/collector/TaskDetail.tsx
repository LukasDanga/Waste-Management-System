import { useState } from 'react';
import { MapPin, Phone, Clock, Weight, ArrowLeft, Upload, Navigation } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface TaskDetailProps {
  taskId: string;
  onNavigate: (page: string) => void;
}

export function TaskDetail({ taskId, onNavigate }: TaskDetailProps) {
  const [currentStatus, setCurrentStatus] = useState<'assigned' | 'on-the-way' | 'collected'>('assigned');
  const [actualWeight, setActualWeight] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [afterImage, setAfterImage] = useState<File | null>(null);

  // Mock task data
  const task = {
    id: taskId,
    reportId: '#R20240112-005',
    address: '78 Nguyễn Huệ, Quận 1, TP.HCM',
    type: 'Rác tái chế',
    weight: '15kg',
    scheduledTime: '14:00',
    distance: '2.3km',
    reporter: 'Nguyễn Văn A',
    phone: '0901234567',
    notes: 'Rác đã được phân loại sẵn, để ở cổng chính',
    lat: 10.7769,
    lng: 106.7009,
    status: currentStatus,
  };

  const handleStatusUpdate = () => {
    if (currentStatus === 'assigned') {
      setCurrentStatus('on-the-way');
      alert('Đã cập nhật trạng thái: Đang đến');
    } else if (currentStatus === 'on-the-way') {
      setCurrentStatus('collected');
    }
  };

  const handleComplete = () => {
    if (!afterImage || !actualWeight) {
      alert('Vui lòng upload ảnh và nhập khối lượng thực tế');
      return;
    }
    alert('Đã hoàn thành thu gom!');
    onNavigate('tasks');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAfterImage(e.target.files[0]);
    }
  };

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
          <span className="text-xl font-semibold text-green-600">{task.reportId}</span>
          {currentStatus === 'assigned' && (
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 text-sm font-medium">
              Đã phân công
            </span>
          )}
          {currentStatus === 'on-the-way' && (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-sm font-medium">
              Đang đến
            </span>
          )}
          {currentStatus === 'collected' && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 text-sm font-medium">
              Đã thu gom
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Task Info */}
        <div className="space-y-6">
          {/* Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Ảnh rác ban đầu</h2>
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-6xl">♻️</span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Địa chỉ</div>
                  <div className="font-medium text-gray-900">{task.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">♻️</span>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Loại rác</div>
                  <div className="font-medium text-gray-900">{task.type}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Weight className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Khối lượng ước tính</div>
                  <div className="font-medium text-gray-900">{task.weight}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Thời gian hẹn</div>
                  <div className="font-medium text-gray-900">{task.scheduledTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reporter Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Người báo cáo</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{task.reporter.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{task.reporter}</div>
                  <div className="text-sm text-gray-500">Người dân</div>
                </div>
              </div>
              <a
                href={`tel:${task.phone}`}
                className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">{task.phone}</span>
              </a>
            </div>
          </div>

          {/* Special Notes */}
          {task.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="font-semibold text-gray-900 mb-2">Ghi chú đặc biệt</h2>
              <p className="text-gray-700">{task.notes}</p>
            </div>
          )}

          {/* Map */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Vị trí trên bản đồ</h2>
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Bản đồ hiển thị vị trí</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" />
              Mở Google Maps để chỉ đường
            </button>
          </div>
        </div>

        {/* Right Column - Status Update */}
        <div className="space-y-6">
          {/* Status Update Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Cập nhật trạng thái</h2>
            
            <RadioGroup value={currentStatus} onValueChange={(value) => setCurrentStatus(value as any)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                  <RadioGroupItem value="assigned" id="assigned" />
                  <Label htmlFor="assigned" className="cursor-pointer flex-1">
                    Assigned (Đã phân công)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                  <RadioGroupItem value="on-the-way" id="on-the-way" />
                  <Label htmlFor="on-the-way" className="cursor-pointer flex-1">
                    On the way (Đang đến)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                  <RadioGroupItem value="collected" id="collected" />
                  <Label htmlFor="collected" className="cursor-pointer flex-1">
                    Collected (Đã thu gom)
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {currentStatus !== 'collected' && (
              <button
                onClick={handleStatusUpdate}
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Cập nhật
              </button>
            )}
          </div>

          {/* Complete Collection Form */}
          {currentStatus === 'collected' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Xác nhận hoàn thành</h2>
              
              <div className="space-y-6">
                {/* Upload Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📸 Chụp ảnh sau thu gom:
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="after-image"
                    />
                    <label htmlFor="after-image" className="cursor-pointer">
                      {afterImage ? (
                        <div>
                          <Upload className="w-12 h-12 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600 font-medium">{afterImage.name}</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click để upload ảnh</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG lên đến 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Actual Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⚖️ Khối lượng thực tế:
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      placeholder="Nhập khối lượng"
                      className="flex-1"
                    />
                    <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                      kg
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Ghi chú (nếu có):
                  </label>
                  <Textarea
                    value={completionNotes}
                    onChange={(e) => setCompletionNotes(e.target.value)}
                    placeholder="Nhập ghi chú về công việc..."
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleComplete}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    ✅ Hoàn thành
                  </button>
                  <button
                    onClick={() => setCurrentStatus('on-the-way')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
