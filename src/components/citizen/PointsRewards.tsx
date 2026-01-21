import { Trophy, TrendingUp, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Button } from '../ui/button';

export function PointsRewards() {
  const [rulesOpen, setRulesOpen] = useState(false);

  const pointsHistory = [
    { date: '12/01/2026', activity: 'Báo cáo rác tái chế', points: '+15', total: '2,350' },
    { date: '11/01/2026', activity: 'Phân loại chính xác', points: '+5', total: '2,335' },
    { date: '10/01/2026', activity: 'Báo cáo rác hữu cơ', points: '+10', total: '2,330' },
    { date: '09/01/2026', activity: 'Báo cáo rác tái chế', points: '+12', total: '2,320' },
    { date: '08/01/2026', activity: 'Streak 7 ngày liên tục', points: '+20', total: '2,308' },
    { date: '07/01/2026', activity: 'Báo cáo rác thông thường', points: '+8', total: '2,288' },
    { date: '06/01/2026', activity: 'Phân loại chính xác', points: '+5', total: '2,280' },
    { date: '05/01/2026', activity: 'Báo cáo rác tái chế', points: '+15', total: '2,275' }
  ];

  const pointRules = [
    {
      category: 'Báo cáo rác',
      rules: [
        { action: 'Rác hữu cơ', points: '+10 điểm' },
        { action: 'Rác tái chế', points: '+12-15 điểm' },
        { action: 'Rác thông thường', points: '+8 điểm' },
        { action: 'Rác nguy hại', points: '+20 điểm' }
      ]
    },
    {
      category: 'Bonus',
      rules: [
        { action: 'Phân loại chính xác (AI confirm)', points: '+5 điểm' },
        { action: 'Ảnh chất lượng cao', points: '+3 điểm' },
        { action: 'Mô tả chi tiết', points: '+2 điểm' },
        { action: 'Streak 7 ngày liên tục', points: '+20 điểm' },
        { action: 'Streak 30 ngày liên tục', points: '+100 điểm' }
      ]
    }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Điểm thưởng & Hạng</h1>
        <p className="text-gray-600">Theo dõi điểm tích lũy và phần thưởng của bạn</p>
      </div>

      {/* Summary Card */}
      <Card className="p-8 mb-6 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-200">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold mb-2">TỔNG ĐIỂM CỦA BẠN</h2>
          <div className="text-5xl font-bold text-yellow-600 mb-6">2,350 điểm</div>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Hạng: 🥈 Bạc</span>
              <span className="text-sm text-gray-600">Còn 650 điểm để lên Vàng</span>
            </div>
            <Progress value={78} className="h-3" />
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>🥉 Đồng: 0</span>
              <span>🥈 Bạc: 1,000</span>
              <span>🥇 Vàng: 3,000</span>
              <span>💎 Kim Cương: 10,000</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">+385</div>
              <div className="text-sm text-gray-600">Điểm tháng này</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-gray-600">Trung bình/báo cáo</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">12 🔥</div>
              <div className="text-sm text-gray-600">Ngày liên tục</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Points History */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Lịch sử điểm</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Hoạt động</TableHead>
                <TableHead className="text-right">Điểm</TableHead>
                <TableHead className="text-right">Tổng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointsHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.activity}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600 font-semibold">{item.points}</span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Point Rules */}
      <Collapsible open={rulesOpen} onOpenChange={setRulesOpen}>
        <Card className="p-6">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <h2 className="text-xl font-bold">Chi tiết cách tính điểm</h2>
              {rulesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-6">
            <div className="space-y-6">
              {pointRules.map((category, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg mb-3 text-green-600">{category.category}</h3>
                  <div className="space-y-2">
                    {category.rules.map((rule, rIndex) => (
                      <div key={rIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{rule.action}</span>
                        <span className="font-semibold text-green-600">{rule.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                💡 <strong>Lưu ý:</strong> Điểm thưởng có thể thay đổi tùy theo chính sách. 
                Báo cáo sai thông tin hoặc spam sẽ bị trừ điểm và có thể bị khóa tài khoản.
              </p>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
