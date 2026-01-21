import { Phone, Calendar, TrendingUp, Star, Truck } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Progress } from '../../ui/progress';
import type { Collector } from './types';

interface CollectorDetailDialogProps {
  collector: Collector;
}

export function CollectorDetailDialog({ collector }: CollectorDetailDialogProps) {
  return (
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
                <p className="text-gray-600">
                  <Truck className="inline h-4 w-4 mr-1" /> {collector.vehicle} - BKS: {collector.licensePlate}
                </p>
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
                <p className="text-xl font-bold">
                  {collector.todayJobs.completed}/{collector.todayJobs.total}
                </p>
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
                <Phone className="h-5 w-5 text-purple-600" />
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
                <div className="flex items-center gap-1 mb-1">{'⭐'.repeat(review.rating)}</div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Gọi ngay</Button>
          <Button className="flex-1 border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50">
            Phân công việc mới
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
