import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Progress } from '../../ui/progress';
import { Phone, Truck } from 'lucide-react';
import type { Collector } from './types';

interface CollectorCardProps {
  collector: Collector;
  onSelect: (collector: Collector) => void;
}

export function CollectorCard({ collector, onSelect }: CollectorCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    onSelect(collector);
    setDialogOpen(true);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
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
        <Badge
          className={
            collector.status === 'available'
              ? 'bg-green-100 text-green-700 w-full justify-center'
              : 'bg-yellow-100 text-yellow-700 w-full justify-center'
          }
        >
          {collector.status === 'available' ? '🟢' : '🟡'} {collector.statusLabel}
        </Badge>

        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Hôm nay:</span>
            <span className="font-semibold">
              {collector.todayJobs.completed}/{collector.todayJobs.total}
            </span>
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex-1 border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 text-sm py-2"
              onClick={handleOpen}
            >
              Chi tiết
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thông tin chi tiết</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <span>{collector.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-600" />
                <span>
                  {collector.vehicle} • {collector.licensePlate}
                </span>
              </div>
              <Badge
                className={
                  collector.status === 'available'
                    ? 'bg-green-100 text-green-700 w-full justify-center'
                    : 'bg-yellow-100 text-yellow-700 w-full justify-center'
                }
              >
                {collector.status === 'available' ? '🟢' : '🟡'} {collector.statusLabel}
              </Badge>
              <div className="flex justify-between">
                <span className="text-gray-600">Hôm nay:</span>
                <span className="font-semibold">
                  {collector.todayJobs.completed}/{collector.todayJobs.total}
                </span>
              </div>
              <Progress value={(collector.todayJobs.completed / collector.todayJobs.total) * 100} className="h-2" />
              <div className="flex justify-between">
                <span className="text-gray-600">Tuần:</span>
                <span className="font-semibold">{collector.weekJobs} công việc</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Đánh giá:</span>
                <span className="font-semibold">⭐ {collector.rating}/5</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm py-2">
          Phân công
        </Button>
      </div>
    </Card>
  );
}
