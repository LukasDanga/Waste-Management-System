import { useState } from 'react';
import { CheckCircle, XCircle, Info, Filter, Search, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CollectionRequestsProps {
  onNavigate: (section: string, data?: any) => void;
}

export function CollectionRequests({ onNavigate }: CollectionRequestsProps) {
  const [filters, setFilters] = useState({
    area: 'all',
    type: 'all',
    weight: 'all'
  });

  const requests = [
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
  const assignedRequests = [
    { ...requests[0], status: 'assigned', collector: 'Nguyễn Văn B' }
  ];
  const completedRequests = [
    { ...requests[1], status: 'completed', completedTime: '10:30 12/01/2026' }
  ];

  const handleAccept = (requestId: string) => {
    alert(`Đã chấp nhận yêu cầu ${requestId}`);
  };

  const handleReject = (requestId: string) => {
    alert(`Đã từ chối yêu cầu ${requestId}`);
  };

  const RequestCard = ({ request, showActions = true }: any) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Image */}
        <img
          src={request.image}
          alt={request.typeLabel}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg">{request.id}</h3>
            {request.priority === 'high' && request.aiReason && (
              <Badge className="bg-orange-100 text-orange-700 border-orange-300 whitespace-nowrap">
                <Target className="h-3 w-3 mr-1" />
                Ưu tiên cao
              </Badge>
            )}
          </div>

          <div className="space-y-1 text-sm mb-3">
            <p className="text-gray-600">📍 {request.location}</p>
            <p>
              <span className="mr-2">{request.typeLabel}</span>
              <span className="text-gray-600">- {request.weight}</span>
            </p>
            <p className="text-gray-500">⏰ {request.timeAgo}</p>
            {request.aiReason && (
              <p className="text-xs text-orange-600">🎯 {request.aiReason}</p>
            )}
            {request.collector && (
              <p className="text-xs text-blue-600">👷 Đã phân công: {request.collector}</p>
            )}
            {request.completedTime && (
              <p className="text-xs text-green-600">✅ Hoàn thành: {request.completedTime}</p>
            )}
          </div>

          {/* Actions */}
          {showActions && request.status === 'pending' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAccept(request.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Chấp nhận
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => handleReject(request.id)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Từ chối
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigate('request-detail', request)}
              >
                <Info className="h-4 w-4 mr-1" />
                Chi tiết
              </Button>
            </div>
          )}

          {request.status === 'accepted' && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onNavigate('request-detail', request)}
            >
              Phân công Collector
            </Button>
          )}

          {(request.status === 'assigned' || request.status === 'completed') && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate('request-detail', request)}
            >
              <Info className="h-4 w-4 mr-1" />
              Xem chi tiết
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Yêu cầu thu gom</h1>
        <p className="text-gray-600">Quản lý và xử lý các yêu cầu từ người dân</p>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold">Bộ lọc</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Tìm kiếm..." className="pl-9 bg-input-background" />
          </div>

          <Select value={filters.area} onValueChange={(value) => setFilters({ ...filters, area: value })}>
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Khu vực" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả khu vực</SelectItem>
              <SelectItem value="q1">Quận 1</SelectItem>
              <SelectItem value="q3">Quận 3</SelectItem>
              <SelectItem value="q5">Quận 5</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Loại rác" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="organic">🌿 Hữu cơ</SelectItem>
              <SelectItem value="recyclable">♻️ Tái chế</SelectItem>
              <SelectItem value="general">🗑️ Thông thường</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.weight} onValueChange={(value) => setFilters({ ...filters, weight: value })}>
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Khối lượng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="small">Nhỏ (&lt;5kg)</SelectItem>
              <SelectItem value="medium">Trung bình (5-20kg)</SelectItem>
              <SelectItem value="large">Lớn (&gt;20kg)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

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
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          {assignedRequests.map((request) => (
            <RequestCard key={request.id} request={request} showActions={false} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedRequests.map((request) => (
            <RequestCard key={request.id} request={request} showActions={false} />
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
