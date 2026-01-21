import { ArrowLeft, MapPin, Calendar, Award, MessageSquare, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface ReportDetailProps {
  onNavigate: (section: string) => void;
  reportData?: any;
}

export function ReportDetail({ onNavigate, reportData }: ReportDetailProps) {
  // Use passed data or default mock data
  const report = reportData || {
    id: '#R20260112-001',
    location: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    type: 'recyclable',
    typeLabel: '♻️ Rác tái chế',
    status: 'assigned',
    statusLabel: 'Đang thu gom',
    points: 15,
    date: '12/01/2026 09:30',
    description: 'Nhiều chai nhựa và hộp giấy cần thu gom. Khối lượng khoảng 15kg.',
    weight: 'Trung bình (5-20kg)',
    image: 'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const timeline = [
    {
      status: 'completed',
      title: 'Đã tạo báo cáo',
      date: '12/01/2026 09:30',
      description: null
    },
    {
      status: 'completed',
      title: 'Đã được chấp nhận',
      date: '12/01/2026 10:15',
      description: 'Bởi: Green Recycle Co.'
    },
    {
      status: 'current',
      title: 'Đã phân công nhân viên',
      date: '12/01/2026 11:00',
      description: 'Người thu: Nguyễn Văn B'
    },
    {
      status: 'pending',
      title: 'Đang đến thu gom',
      date: 'Dự kiến: 12/01/2026 14:00',
      description: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'assigned':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'collected':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('my-reports')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Quay lại
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{report.id}</h1>
            <p className="text-gray-600">{report.date}</p>
          </div>
          <Badge className={`px-4 py-2 text-base border-2 ${getStatusColor(report.status)}`}>
            {report.statusLabel}
          </Badge>
        </div>
      </div>

      {/* Image Gallery */}
      <Card className="p-4 mb-6">
        <img
          src={report.image}
          alt={report.typeLabel}
          className="w-full h-96 object-cover rounded-lg"
        />
      </Card>

      {/* Information Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Waste Info */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Thông tin rác</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Loại rác:</span>
              <span className="font-semibold">{report.typeLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khối lượng ước tính:</span>
              <span className="font-semibold">{report.weight}</span>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Mô tả chi tiết:</p>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{report.description}</p>
            </div>
          </div>
        </Card>

        {/* Location & Points */}
        <div className="space-y-6">
          {/* Location */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Vị trí
            </h2>
            <div className="space-y-3">
              <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                🗺️ Bản đồ
              </div>
              <p className="text-sm">{report.location}</p>
            </div>
          </Card>

          {/* Points */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Điểm thưởng
            </h2>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-600">+{report.points} điểm</div>
              <p className="text-sm text-gray-600">Lý do: Phân loại đúng và báo cáo kịp thời</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Timeline */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-6">Trạng thái xử lý</h2>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : item.status === 'current'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {item.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : item.status === 'current' ? (
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                  ) : (
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                  )}
                </div>
                {index < timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-12 ${
                      item.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.date}</p>
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="flex-1 sm:flex-initial"
          onClick={() => onNavigate('feedback')}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Gửi phản hồi
        </Button>
        {report.status === 'pending' && (
          <Button
            variant="outline"
            className="flex-1 sm:flex-initial text-red-600 border-red-300 hover:bg-red-50"
          >
            <XCircle className="mr-2 h-5 w-5" />
            Hủy báo cáo
          </Button>
        )}
      </div>
    </div>
  );
}
