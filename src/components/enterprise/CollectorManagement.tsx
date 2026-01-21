import { useState } from 'react';
import { Plus, Phone, Truck, Star, Calendar, TrendingUp, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Progress } from '../ui/progress';

export function CollectorManagement() {
  const [selectedCollector, setSelectedCollector] = useState<any>(null);

  const collectors = [
    {
      id: 1,
      name: 'Nguyễn Văn B',
      phone: '0901234567',
      vehicle: 'Xe tải nhỏ',
      licensePlate: '51A-12345',
      status: 'available',
      statusLabel: 'Đang rảnh',
      todayJobs: { completed: 3, total: 8 },
      weekJobs: 42,
      rating: 4.8,
      totalReviews: 156,
      avatar: '👨',
      joinDate: '01/2024'
    },
    {
      id: 2,
      name: 'Trần Văn C',
      phone: '0907654321',
      vehicle: 'Xe tải trung',
      licensePlate: '51B-67890',
      status: 'busy',
      statusLabel: 'Đang có 2 việc',
      todayJobs: { completed: 5, total: 10 },
      weekJobs: 38,
      rating: 4.6,
      totalReviews: 142,
      avatar: '👨',
      joinDate: '03/2024'
    },
    {
      id: 3,
      name: 'Lê Minh D',
      phone: '0909876543',
      vehicle: 'Xe tải nhỏ',
      licensePlate: '51C-11223',
      status: 'available',
      statusLabel: 'Đang rảnh',
      todayJobs: { completed: 4, total: 8 },
      weekJobs: 52,
      rating: 4.9,
      totalReviews: 203,
      avatar: '👨',
      joinDate: '12/2023'
    },
    {
      id: 4,
      name: 'Phạm Thị E',
      phone: '0903456789',
      vehicle: 'Xe máy chuyên dụng',
      licensePlate: '51D-44556',
      status: 'available',
      statusLabel: 'Đang rảnh',
      todayJobs: { completed: 6, total: 12 },
      weekJobs: 35,
      rating: 4.7,
      totalReviews: 128,
      avatar: '👩',
      joinDate: '05/2024'
    }
  ];

  const CollectorDetailDialog = ({ collector }: any) => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Chi tiết Collector</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl">
              {collector.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{collector.name}</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">📞 {collector.phone}</p>
                <p className="text-gray-600">🚛 {collector.vehicle} - BKS: {collector.licensePlate}</p>
                <p className="text-gray-600">📅 Gia nhập: {collector.joinDate}</p>
              </div>
            </div>
            <Badge className={collector.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
              {collector.statusLabel}
            </Badge>
          </div>
        </Card>

        {/* Performance Stats */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Công việc hôm nay</p>
                <p className="text-xl font-bold">{collector.todayJobs.completed}/{collector.todayJobs.total}</p>
              </div>
            </div>
            <Progress value={(collector.todayJobs.completed / collector.todayJobs.total) * 100} />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hoàn thành tuần</p>
                <p className="text-xl font-bold">{collector.weekJobs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Đánh giá</p>
                <p className="text-xl font-bold">⭐ {collector.rating}/5.0</p>
                <p className="text-xs text-gray-500">({collector.totalReviews} đánh giá)</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hiệu suất</p>
                <p className="text-xl font-bold">95%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Reviews */}
        <Card className="p-6">
          <h3 className="font-bold mb-4">Đánh giá gần đây</h3>
          <div className="space-y-3">
            {[
              { user: 'Nguyễn Thị A', rating: 5, comment: 'Thu gom nhanh chóng, thái độ tốt!', date: '10/01/2026' },
              { user: 'Trần Văn B', rating: 5, comment: 'Rất chuyên nghiệp', date: '09/01/2026' },
              { user: 'Lê Minh C', rating: 4, comment: 'Tốt, đúng giờ', date: '08/01/2026' }
            ].map((review, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{review.user}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Phone className="mr-2 h-4 w-4" />
            Liên hệ
          </Button>
          <Button variant="outline" className="flex-1">
            Phân công việc mới
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quản lý Collector</h1>
            <p className="text-gray-600">Quản lý nhân viên thu gom rác thải</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-5 w-5" />
              Xuất báo cáo
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-5 w-5" />
              Thêm Collector mới
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <p className="text-sm text-gray-600 mb-1">Đang hoạt động</p>
          <p className="text-3xl font-bold text-green-600">15</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Đang rảnh</p>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <p className="text-sm text-gray-600 mb-1">Đang bận</p>
          <p className="text-3xl font-bold text-yellow-600">7</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <p className="text-sm text-gray-600 mb-1">Đánh giá TB</p>
          <p className="text-3xl font-bold text-purple-600">4.7⭐</p>
        </Card>
      </div>

      {/* Collector Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collectors.map((collector) => (
          <Card key={collector.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                  {collector.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{collector.name}</h3>
                  <p className="text-xs text-gray-600">{collector.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-600">
                <Truck className="inline h-4 w-4 mr-1" />
                {collector.vehicle}
              </p>
              <p className="text-xs text-gray-500">BKS: {collector.licensePlate}</p>
            </div>

            <div className="space-y-3 mb-4">
              <Badge className={collector.status === 'available' ? 'bg-green-100 text-green-700 w-full justify-center' : 'bg-yellow-100 text-yellow-700 w-full justify-center'}>
                {collector.status === 'available' ? '🟢' : '🟡'} {collector.statusLabel}
              </Badge>
              
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Hôm nay:</span>
                  <span className="font-semibold">{collector.todayJobs.completed}/{collector.todayJobs.total}</span>
                </div>
                <Progress value={(collector.todayJobs.completed / collector.todayJobs.total) * 100} className="h-2" />
              </div>

              <div className="text-sm flex justify-between">
                <span className="text-gray-600">Tuần:</span>
                <span className="font-semibold">{collector.weekJobs} công việc</span>
              </div>

              <div className="text-sm flex justify-between">
                <span className="text-gray-600">Đánh giá:</span>
                <span className="font-semibold">⭐ {collector.rating}/5</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedCollector(collector)}
                  >
                    Chi tiết
                  </Button>
                </DialogTrigger>
                {selectedCollector?.id === collector.id && (
                  <CollectorDetailDialog collector={collector} />
                )}
              </Dialog>
              
              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Phân công
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
