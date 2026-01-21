import { useState } from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function Analytics() {
  const [timeFilter, setTimeFilter] = useState('month');
  const [typeFilter, setTypeFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');

  const volumeData = [
    { name: 'Tuần 1', organic: 12.5, recyclable: 24.3, general: 18.7 },
    { name: 'Tuần 2', organic: 15.2, recyclable: 28.1, general: 20.3 },
    { name: 'Tuần 3', organic: 13.8, recyclable: 26.5, general: 19.1 },
    { name: 'Tuần 4', organic: 16.3, recyclable: 30.2, general: 21.8 }
  ];

  const pieData = [
    { name: 'Rác tái chế', value: 108.1, color: '#3b82f6' },
    { name: 'Rác hữu cơ', value: 57.8, color: '#10b981' },
    { name: 'Rác thông thường', value: 79.9, color: '#6b7280' },
    { name: 'Rác nguy hại', value: 4.2, color: '#ef4444' }
  ];

  const trendData = [
    { month: 'T7', requests: 320 },
    { month: 'T8', requests: 385 },
    { month: 'T9', requests: 412 },
    { month: 'T10', requests: 468 },
    { month: 'T11', requests: 523 },
    { month: 'T12', requests: 589 },
    { month: 'T1', requests: 612 }
  ];

  const summaryData = [
    {
      type: 'Tái chế',
      requests: 234,
      weight: '3,450 kg',
      completionRate: '98%'
    },
    {
      type: 'Hữu cơ',
      requests: 156,
      weight: '2,100 kg',
      completionRate: '95%'
    },
    {
      type: 'Nguy hại',
      requests: 12,
      weight: '180 kg',
      completionRate: '100%'
    },
    {
      type: 'Thông thường',
      requests: 198,
      weight: '2,870 kg',
      completionRate: '96%'
    }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Báo cáo & Thống kê</h1>
            <p className="text-gray-600">Phân tích dữ liệu hoạt động thu gom</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              In báo cáo
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Thời gian</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm này</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Loại rác</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="organic">Hữu cơ</SelectItem>
                <SelectItem value="recyclable">Tái chế</SelectItem>
                <SelectItem value="hazardous">Nguy hại</SelectItem>
                <SelectItem value="general">Thông thường</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Khu vực</label>
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="q1">Quận 1</SelectItem>
                <SelectItem value="q3">Quận 3</SelectItem>
                <SelectItem value="q7">Quận 7</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Tổng yêu cầu</p>
          <p className="text-3xl font-bold text-blue-600 mb-2">1,248</p>
          <p className="text-xs text-green-600">+18% so với tháng trước</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <p className="text-sm text-gray-600 mb-1">Tổng khối lượng</p>
          <p className="text-3xl font-bold text-green-600 mb-2">82.5 tấn</p>
          <p className="text-xs text-green-600">+12% so với tháng trước</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <p className="text-sm text-gray-600 mb-1">Tỷ lệ hoàn thành</p>
          <p className="text-3xl font-bold text-yellow-600 mb-2">97%</p>
          <p className="text-xs text-green-600">+2% so với tháng trước</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <p className="text-sm text-gray-600 mb-1">Đánh giá TB</p>
          <p className="text-3xl font-bold text-purple-600 mb-2">4.7⭐</p>
          <p className="text-xs text-green-600">+0.2 so với tháng trước</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Volume Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Khối lượng theo thời gian</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Tấn', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="organic" name="Hữu cơ" fill="#10b981" />
              <Bar dataKey="recyclable" name="Tái chế" fill="#3b82f6" />
              <Bar dataKey="general" name="Thông thường" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Phân bố theo loại rác</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Xu hướng số lượng yêu cầu</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="requests" 
              name="Số yêu cầu" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Table */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Bảng tổng kết</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại rác</TableHead>
                <TableHead className="text-right">Số yêu cầu</TableHead>
                <TableHead className="text-right">Khối lượng</TableHead>
                <TableHead className="text-right">Tỷ lệ hoàn thành</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.type}</TableCell>
                  <TableCell className="text-right">{row.requests}</TableCell>
                  <TableCell className="text-right">{row.weight}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-green-600">{row.completionRate}</span>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell>Tổng cộng</TableCell>
                <TableCell className="text-right">600</TableCell>
                <TableCell className="text-right">8,600 kg</TableCell>
                <TableCell className="text-right text-green-600">97%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
