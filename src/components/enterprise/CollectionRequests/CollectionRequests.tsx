import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { FiltersBar } from './FiltersBar';
import { RequestCard } from './RequestCard';
import type { FiltersState, RequestItem } from './types';

interface CollectionRequestsProps {
  onNavigate: (section: string, data?: any) => void;
}

export function CollectionRequests({ onNavigate }: CollectionRequestsProps) {
  const [filters, setFilters] = useState<FiltersState>({
    area: 'all',
    type: 'all',
    weight: 'all'
  });

  const requests: RequestItem[] = [
    {
      id: '#R20260112-001',
      location: '123 Nguyễn Văn A, Q1',
      district: 'Q1',
      type: 'recyclable',
      typeLabel: '♻️ Rác tái chế',
      weight: '15kg',
      timeAgo: '2 giờ trước',
      priority: 'high',
      priorityLabel: 'Cao',
      aiReason: 'Khối lượng lớn, khu vực ưu tiên',
      reporter: 'Nguyễn Thị A',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260112-002',
      location: '456 Trần Hưng Đạo, Q5',
      district: 'Q5',
      type: 'organic',
      typeLabel: '🌿 Rác hữu cơ',
      weight: '8kg',
      timeAgo: '3 giờ trước',
      priority: 'medium',
      priorityLabel: 'Trung bình',
      aiReason: null,
      reporter: 'Trần Văn B',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1592484773536-263bf52e81fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2FzdGUlMjBjb21wb3N0fGVufDF8fHx8MTc2ODE5MjEyNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260112-003',
      location: '789 Lê Lợi, Q3',
      district: 'Q3',
      type: 'general',
      typeLabel: '🗑️ Rác thông thường',
      weight: '12kg',
      timeAgo: '5 giờ trước',
      priority: 'high',
      priorityLabel: 'Cao',
      aiReason: 'Báo cáo gần điểm thu gom',
      reporter: 'Lê Minh C',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1580767114670-c778cc443675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRyYXNoJTIwc3RyZWV0fGVufDF8fHx8MTc2ODE5MjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '#R20260112-004',
      location: '321 Võ Văn Tần, Q3',
      district: 'Q3',
      type: 'recyclable',
      typeLabel: '♻️ Rác tái chế',
      weight: '20kg',
      timeAgo: '1 giờ trước',
      priority: 'high',
      priorityLabel: 'Cao',
      aiReason: 'Khối lượng rất lớn',
      reporter: 'Phạm Thị D',
      status: 'accepted',
      image: 'https://images.unsplash.com/photo-1557344252-4d5c9909579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBwbGFzdGljJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgxOTIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const acceptedRequests = requests.filter(r => r.status === 'accepted');
  const assignedRequests: RequestItem[] = [
    { ...requests[0], status: 'assigned', collector: 'Nguyễn Văn B' }
  ];
  const completedRequests: RequestItem[] = [
    { ...requests[1], status: 'completed', completedTime: '10:30 12/01/2026' }
  ];

  const handleAccept = (requestId: string) => {
    alert(`Đã chấp nhận yêu cầu ${requestId}`);
  };

  const handleReject = (requestId: string) => {
    alert(`Đã từ chối yêu cầu ${requestId}`);
  };

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Yêu cầu thu gom</h1>
        <p className="text-gray-600">Quản lý và xử lý các yêu cầu từ người dân</p>
      </div>

      <FiltersBar filters={filters} onChange={handleFilterChange} />

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pending">
            🆕 Mới ({requests.filter(r => r.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            ✅ Đã chấp nhận ({acceptedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="assigned">
            👷 Đã phân công ({assignedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            ✔️ Hoàn thành ({completedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            ❌ Từ chối (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {requests.filter(r => r.status === 'pending').map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
              onNavigate={onNavigate}
            />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
              onNavigate={onNavigate}
            />
          ))}
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          {assignedRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              showActions={false}
              onAccept={handleAccept}
              onReject={handleReject}
              onNavigate={onNavigate}
            />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              showActions={false}
              onAccept={handleAccept}
              onReject={handleReject}
              onNavigate={onNavigate}
            />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="text-center py-12 text-gray-500">
            Không có yêu cầu bị từ chối
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
