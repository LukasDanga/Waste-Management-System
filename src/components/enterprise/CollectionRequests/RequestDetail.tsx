import { useState } from 'react';
import { ArrowLeft, MapPin, User, Calendar, Package, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface RequestDetailProps {
  onNavigate: (section: string) => void;
  requestData?: any;
}

export function RequestDetail({ onNavigate, requestData }: RequestDetailProps) {
  const [selectedCollector, setSelectedCollector] = useState<string>('');

  const request = requestData || {
    id: '#R20260112-001',
    location: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    type: 'recyclable',
    typeLabel: '♻️ Rác tái chế',
    weight: '15kg',
    reporter: 'Nguyễn Thị A',
    reporterPhone: '0901234567',
    timeCreated: '12/01/2026 09:30',
    description: 'Nhiều chai nhựa và hộp giấy cần thu gom. Vui lòng đến sau 14h.',
    status: 'accepted',
    image: 'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const collectors = [
    {
      id: 'collector1',
      name: 'Nguyễn Văn B',
      distance: '2.3km',
      completedJobs: 45,
      status: 'available',
      statusLabel: 'Đang rảnh',
      rating: 4.8,
      currentJobs: 0
    },
    {
      id: 'collector2',
      name: 'Trần Văn C',
      distance: '5.1km',
      completedJobs: 38,
      status: 'busy',
      statusLabel: 'Đang có 2 việc',
      rating: 4.6,
      currentJobs: 2
    },
    {
      id: 'collector3',
      name: 'Lê Minh D',
      distance: '3.8km',
      completedJobs: 52,
      status: 'available',
      statusLabel: 'Đang rảnh',
      rating: 4.9,
      currentJobs: 0
    }
  ];

  const handleAssign = () => {
    if (!selectedCollector) {
      alert('Vui lòng chọn collector!');
      return;
    }
    const collector = collectors.find(c => c.id === selectedCollector);
    alert(`Đã phân công cho ${collector?.name}`);
    onNavigate('requests');
  };

  const handleReject = () => {
    if (confirm('Bạn có chắc muốn từ chối yêu cầu này?')) {
      alert('Đã từ chối yêu cầu');
      onNavigate('requests');
    }
  };

  const isAssigned = request.status === 'assigned' || request.status === 'completed';

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          onClick={() => onNavigate('requests')}
          className="mb-4 bg-transparent hover:bg-gray-100 text-gray-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Quay lại
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{request.id}</h1>
            <p className="text-gray-600">{request.timeCreated}</p>
          </div>
          <Badge className="px-4 py-2 text-base bg-blue-100 text-blue-700 border-blue-300">
            {request.status === 'pending' ? '🆕 Mới' :
             request.status === 'accepted' ? '✅ Đã chấp nhận' :
             request.status === 'assigned' ? '👷 Đã phân công' :
             '✔️ Hoàn thành'}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Request Info */}
        <div className="space-y-6">
          {/* Image */}
          <Card className="p-4">
            <img
              src={request.image}
              alt={request.typeLabel}
              className="w-full h-64 object-cover rounded-lg"
            />
          </Card>

          {/* Basic Info */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin yêu cầu</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Loại rác</p>
                  <p className="font-semibold">{request.typeLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Khối lượng ước tính</p>
                  <p className="font-semibold">{request.weight}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="font-semibold">{request.location}</p>
                  <div className="h-32 bg-gray-200 rounded-lg mt-2 flex items-center justify-center text-gray-500">
                    🗺️ Bản đồ
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Người báo cáo</p>
                  <p className="font-semibold">{request.reporter}</p>
                  <p className="text-sm text-gray-600">{request.reporterPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Thời gian tạo</p>
                  <p className="font-semibold">{request.timeCreated}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Mô tả chi tiết</p>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{request.description}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Assignment */}
        <div>
          {!isAssigned ? (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Chọn Collector</h2>
              
              <RadioGroup value={selectedCollector} onValueChange={setSelectedCollector}>
                <div className="space-y-4">
                  {collectors.map((collector) => (
                    <label
                      key={collector.id}
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedCollector === collector.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value={collector.id} id={collector.id} className="mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{collector.name}</h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            📍 {collector.distance} | ✅ {collector.completedJobs} công việc
                          </p>
                          <p className="text-gray-600">⭐ {collector.rating}/5.0</p>
                          <p className={collector.status === 'available' ? 'text-green-600' : 'text-yellow-600'}>
                            {collector.status === 'available' ? '🟢' : '🟡'} {collector.statusLabel}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleAssign}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedCollector}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Phân công
                </Button>
                <Button
                  onClick={handleReject}
                  className="flex-1 text-red-600 border border-red-300 bg-white hover:bg-red-50"
                >
                  Từ chối yêu cầu
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Assigned Collector Info */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <h2 className="text-xl font-bold mb-4">Thông tin Collector</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Nguyễn Văn B</p>
                      <p className="text-sm text-gray-600">📞 0901234567</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                    <p className="font-semibold text-blue-600">🚛 Đang đến địa điểm</p>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Liên hệ Collector
                </Button>
              </Card>

              {/* Timeline */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Tiến trình</h2>
                <div className="space-y-4">
                  {[
                    { status: 'completed', title: 'Yêu cầu được tạo', time: '09:30 12/01/2026' },
                    { status: 'completed', title: 'Đã chấp nhận yêu cầu', time: '10:00 12/01/2026' },
                    { status: 'current', title: 'Đã phân công cho Nguyễn Văn B', time: '10:30 12/01/2026' },
                    { status: 'pending', title: 'Đang thu gom', time: 'Dự kiến: 14:00' }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.status === 'completed'
                              ? 'bg-green-100 text-green-600'
                              : item.status === 'current'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {item.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                          {item.status === 'current' && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />}
                          {item.status === 'pending' && <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                        </div>
                        {index < 3 && (
                          <div
                            className={`w-0.5 h-12 ${
                              item.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
