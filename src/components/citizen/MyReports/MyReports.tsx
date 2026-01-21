import { useState } from 'react';
import { FiltersPanel } from './FiltersPanel';
import { ReportCard } from './ReportCard';
import { PaginationControls } from './PaginationControls';
import type { ReportFilters, ReportItem } from './types';

interface MyReportsProps {
  onNavigate: (section: string, data?: any) => void;
}

export function MyReports({ onNavigate }: MyReportsProps) {
  const [filters, setFilters] = useState<ReportFilters>({ status: 'all', type: 'all', time: '30' });

  const reports: ReportItem[] = [
    {
      id: '#R20260112-001',
      location: '123 Nguyễn Văn A, Q1',
      type: 'recyclable',
      typeLabel: '♻️ Rác tái chế',
      status: 'collected',
      statusLabel: 'Đã thu gom',
      points: '+15',
      date: '12/01/2026',
      image:
        'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260111-045',
      location: '456 Trần Hưng Đạo, Q5',
      type: 'organic',
      typeLabel: '🌿 Rác hữu cơ',
      status: 'assigned',
      statusLabel: 'Đang thu gom',
      points: '+10',
      date: '11/01/2026',
      image:
        'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260110-023',
      location: '789 Lê Lợi, Q3',
      type: 'general',
      typeLabel: '🗑️ Rác thông thường',
      status: 'pending',
      statusLabel: 'Chờ xử lý',
      points: '+8',
      date: '10/01/2026',
      image:
        'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260109-056',
      location: '321 Hai Bà Trưng, Q1',
      type: 'recyclable',
      typeLabel: '♻️ Rác tái chế',
      status: 'accepted',
      statusLabel: 'Đã chấp nhận',
      points: '+12',
      date: '09/01/2026',
      image:
        'https://images.unsplash.com/photo-1561069157-218187260215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY29sbGVjdGlvbiUyMHRydWNrfGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260108-034',
      location: '654 Võ Văn Tần, Q3',
      type: 'organic',
      typeLabel: '🌿 Rác hữu cơ',
      status: 'collected',
      statusLabel: 'Đã thu gom',
      points: '+10',
      date: '08/01/2026',
      image:
        'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260107-012',
      location: '234 Cách Mạng Tháng 8, Q10',
      type: 'general',
      typeLabel: '🗑️ Rác thông thường',
      status: 'collected',
      statusLabel: 'Đã thu gom',
      points: '+8',
      date: '07/01/2026',
      image:
        'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Báo cáo của tôi</h1>
        <p className="text-gray-600">Quản lý và theo dõi các báo cáo rác thải của bạn</p>
      </div>

      <FiltersPanel filters={filters} onChange={setFilters} />

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} onClick={() => onNavigate('report-detail', report)} />
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls />
    </div>
  );
}
