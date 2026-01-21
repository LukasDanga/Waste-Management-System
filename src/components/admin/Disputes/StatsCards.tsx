import { AlertTriangle, CheckCircle, FileText, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import type { Complaint } from './types';

interface StatsCardsProps {
  complaints: Complaint[];
}

export function StatsCards({ complaints }: StatsCardsProps) {
  const newCount = complaints.filter((c) => c.status === 'new').length;
  const inProgressCount = complaints.filter((c) => c.status === 'in-progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;
  const total = complaints.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">Khiếu nại mới</CardTitle>
          <AlertTriangle className="w-5 h-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">{newCount}</div>
        </CardContent>
      </Card>
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">Đang xử lý</CardTitle>
          <MessageSquare className="w-5 h-5 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">{inProgressCount}</div>
        </CardContent>
      </Card>
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">Đã giải quyết</CardTitle>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">{resolvedCount}</div>
        </CardContent>
      </Card>
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">Tổng khiếu nại</CardTitle>
          <FileText className="w-5 h-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">{total}</div>
        </CardContent>
      </Card>
    </div>
  );
}
