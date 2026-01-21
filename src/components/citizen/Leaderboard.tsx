import { Trophy, Medal, Award } from 'lucide-react';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function Leaderboard() {
  const topThree = [
    {
      rank: 2,
      name: 'Trần Văn B',
      district: 'Quận 3',
      points: 4890,
      reports: 326,
      avatar: '👨'
    },
    {
      rank: 1,
      name: 'Nguyễn Thị A',
      district: 'Quận 1',
      points: 5230,
      reports: 348,
      avatar: '👩'
    },
    {
      rank: 3,
      name: 'Lê Minh C',
      district: 'Quận 5',
      points: 4120,
      reports: 274,
      avatar: '👨'
    }
  ];

  const rankings = [
    { rank: 4, name: 'Phạm Thị D', district: 'Quận 1', points: 3850, reports: 257 },
    { rank: 5, name: 'Hoàng Văn E', district: 'Quận 2', points: 3620, reports: 241 },
    { rank: 6, name: 'Võ Thị F', district: 'Quận 4', points: 3480, reports: 232 },
    { rank: 7, name: 'Đặng Văn G', district: 'Quận 7', points: 3290, reports: 219 },
    { rank: 8, name: 'Bùi Thị H', district: 'Quận 3', points: 3150, reports: 210 },
    { rank: 9, name: 'Ngô Văn I', district: 'Quận 6', points: 2980, reports: 198 },
    { rank: 10, name: 'Trương Thị K', district: 'Quận 8', points: 2850, reports: 190 }
  ];

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Bảng xếp hạng 🏆</h1>
        <p className="text-gray-600">Xem thành tích của bạn so với cộng đồng</p>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-sm font-medium mb-2 block">Khu vực</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toàn thành phố</SelectItem>
              <SelectItem value="q1">Quận 1</SelectItem>
              <SelectItem value="q2">Quận 2</SelectItem>
              <SelectItem value="q3">Quận 3</SelectItem>
              <SelectItem value="q4">Quận 4</SelectItem>
              <SelectItem value="q5">Quận 5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Thời gian</label>
          <Select defaultValue="month">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <div className="flex items-end justify-center gap-4 mb-6">
          {/* 2nd Place */}
          <Card className="p-6 text-center w-48 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300">
            <div className="text-5xl mb-2">🥈</div>
            <div className="text-4xl mb-2">{topThree[0].avatar}</div>
            <h3 className="font-bold mb-1">{topThree[0].name}</h3>
            <p className="text-sm text-gray-600 mb-2">{topThree[0].district}</p>
            <div className="text-2xl font-bold text-gray-700">{topThree[0].points.toLocaleString()}</div>
            <p className="text-xs text-gray-500">điểm</p>
          </Card>

          {/* 1st Place */}
          <Card className="p-6 text-center w-52 bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-yellow-400 transform scale-110 shadow-xl">
            <div className="text-6xl mb-2">🥇</div>
            <div className="text-5xl mb-2">{topThree[1].avatar}</div>
            <h3 className="font-bold text-lg mb-1">{topThree[1].name}</h3>
            <p className="text-sm text-gray-600 mb-2">{topThree[1].district}</p>
            <div className="text-3xl font-bold text-yellow-700">{topThree[1].points.toLocaleString()}</div>
            <p className="text-sm text-yellow-600">điểm</p>
          </Card>

          {/* 3rd Place */}
          <Card className="p-6 text-center w-48 bg-gradient-to-br from-orange-100 to-amber-200 border-2 border-orange-300">
            <div className="text-5xl mb-2">🥉</div>
            <div className="text-4xl mb-2">{topThree[2].avatar}</div>
            <h3 className="font-bold mb-1">{topThree[2].name}</h3>
            <p className="text-sm text-gray-600 mb-2">{topThree[2].district}</p>
            <div className="text-2xl font-bold text-orange-700">{topThree[2].points.toLocaleString()}</div>
            <p className="text-xs text-gray-500">điểm</p>
          </Card>
        </div>
      </div>

      {/* Rankings Table */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Bảng xếp hạng</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Khu vực</TableHead>
                <TableHead className="text-right">Điểm</TableHead>
                <TableHead className="text-right">Báo cáo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell className="font-bold">{getMedalIcon(user.rank)}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.district}</TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    {user.points.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{user.reports}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Your Position */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">👤</div>
            <div>
              <h3 className="font-bold text-lg mb-1">Vị trí của bạn</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-semibold">#24</span>
                <span className="text-gray-600">Quận 3</span>
                <span className="font-semibold text-green-600">2,350 điểm</span>
                <span className="text-gray-600">157 báo cáo</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Bạn cần thêm</p>
            <p className="text-2xl font-bold text-blue-600">500 điểm</p>
            <p className="text-xs text-gray-500">để lên #23</p>
          </div>
        </div>
      </Card>

      {/* Motivational Message */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          💪 Tiếp tục báo cáo rác để cải thiện thứ hạng và giành phần thưởng!
        </p>
      </div>
    </div>
  );
}
