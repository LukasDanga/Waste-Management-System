import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { CollectorCard } from './CollectorCard';
import { SummaryStats } from './SummaryStats';
import type { Collector } from './types';

export function CollectorManagement() {
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);

  const collectors: Collector[] = [
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

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quản lý Collector</h1>
            <p className="text-gray-600">Quản lý nhân viên thu gom rác thải</p>
          </div>
          <div className="flex gap-3">
            <Button className="border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50">
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
      <SummaryStats
        stats={[
          { label: 'Đang hoạt động', value: '15', colorClass: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' },
          { label: 'Đang rảnh', value: '8', colorClass: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' },
          { label: 'Đang bận', value: '7', colorClass: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200' },
          { label: 'Đánh giá TB', value: '4.7⭐', colorClass: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' }
        ]}
      />

      {/* Collector Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collectors.map((collector) => (
          <CollectorCard collector={collector} onSelect={setSelectedCollector} />
        ))}
      </div>
    </div>
  );
}
