import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FiltersBar } from './FiltersBar';
import { HistoryCard } from './HistoryCard';
import { SummaryStats } from './SummaryStats';
import type { HistoryItem, WorkHistoryProps } from './types';

export function WorkHistory({ onNavigate }: WorkHistoryProps) {
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');

  const history: HistoryItem[] = [
    {
      id: '1',
      reportId: '#R20240111-023',
      date: '11/01/2026',
      time: '14:30',
      address: '123 Pasteur, Q1',
      type: 'Rác tái chế',
      weight: '12kg',
      duration: '25 phút',
      status: 'completed',
      rating: 5,
    },
    {
      id: '2',
      reportId: '#R20240111-021',
      date: '11/01/2026',
      time: '13:15',
      address: '45 Lê Lợi, Q1',
      type: 'Rác hữu cơ',
      weight: '18kg',
      duration: '30 phút',
      status: 'completed',
      rating: 5,
    },
    {
      id: '3',
      reportId: '#R20240111-019',
      date: '11/01/2026',
      time: '11:00',
      address: '78 Nguyễn Huệ, Q3',
      type: 'Rác tái chế',
      weight: '8kg',
      duration: '20 phút',
      status: 'completed',
      rating: 4,
    },
    {
      id: '4',
      reportId: '#R20240111-015',
      date: '11/01/2026',
      time: '09:30',
      address: '234 Võ Văn Tần, Q3',
      type: 'Rác hữu cơ',
      weight: '15kg',
      duration: '28 phút',
      status: 'completed',
      rating: 5,
    },
    {
      id: '5',
      reportId: '#R20240110-089',
      date: '10/01/2026',
      time: '16:45',
      address: '56 Lý Tự Trọng, Q1',
      type: 'Rác tái chế',
      weight: '10kg',
      duration: '22 phút',
      status: 'completed',
      rating: 4,
    },
    {
      id: '6',
      reportId: '#R20240110-085',
      date: '10/01/2026',
      time: '15:20',
      address: '167 Hai Bà Trưng, Q1',
      type: 'Rác nguy hại',
      weight: '5kg',
      duration: '0 phút',
      status: 'cancelled',
    },
  ];

  const stats = {
    total: 125,
    completionRate: 98,
    avgTime: 24,
    avgRating: 4.8,
  };

  const filteredHistory = history.filter((item) => {
    if (statusFilter === 'completed' && item.status !== 'completed') return false;
    if (statusFilter === 'cancelled' && item.status !== 'cancelled') return false;
    // Date filtering would be implemented here
    return true;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử hoàn thành</h1>
        <p className="text-gray-600">Xem lại các công việc đã thực hiện</p>
      </div>

      <SummaryStats stats={stats} />

      <FiltersBar
        dateFilter={dateFilter}
        statusFilter={statusFilter}
        onDateChange={setDateFilter}
        onStatusChange={setStatusFilter}
        onApply={() => alert('Đang áp dụng bộ lọc')}
      />

      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <HistoryCard key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không có lịch sử công việc nào</p>
        </div>
      )}
    </div>
  );
}
