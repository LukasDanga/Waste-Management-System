import { Flame, TrendingUp, Trophy } from 'lucide-react';
import { useState } from 'react';
import { PointRulesSection } from './PointRulesSection';
import { PointsHistoryTable } from './PointsHistoryTable';
import { StatsGrid } from './StatsGrid';
import { SummaryCard } from './SummaryCard';
import type { PointRuleCategory, PointsHistoryItem } from './types';

export function PointsRewards() {
  const [rulesOpen, setRulesOpen] = useState(false);

  const pointsHistory: PointsHistoryItem[] = [
    { date: '12/01/2026', activity: 'Báo cáo rác tái chế', points: '+15', total: '2,350' },
    { date: '11/01/2026', activity: 'Phân loại chính xác', points: '+5', total: '2,335' },
    { date: '10/01/2026', activity: 'Báo cáo rác hữu cơ', points: '+10', total: '2,330' },
    { date: '09/01/2026', activity: 'Báo cáo rác tái chế', points: '+12', total: '2,320' },
    { date: '08/01/2026', activity: 'Streak 7 ngày liên tục', points: '+20', total: '2,308' },
    { date: '07/01/2026', activity: 'Báo cáo rác thông thường', points: '+8', total: '2,288' },
    { date: '06/01/2026', activity: 'Phân loại chính xác', points: '+5', total: '2,280' },
    { date: '05/01/2026', activity: 'Báo cáo rác tái chế', points: '+15', total: '2,275' }
  ];

  const pointRules: PointRuleCategory[] = [
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

  const stats = [
    {
      icon: <Trophy className="h-6 w-6 text-green-600" />,
      value: '+385',
      label: 'Điểm tháng này',
      iconBgClass: 'bg-green-100'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      value: '15',
      label: 'Trung bình/báo cáo',
      iconBgClass: 'bg-blue-100'
    },
    {
      icon: <Flame className="h-6 w-6 text-orange-600" />,
      value: '12 🔥',
      label: 'Ngày liên tục',
      iconBgClass: 'bg-orange-100'
    }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Điểm thưởng & Hạng</h1>
        <p className="text-gray-600">Theo dõi điểm tích lũy và phần thưởng của bạn</p>
      </div>

      <SummaryCard
        totalPoints={2350}
        rankName="Bạc"
        rankIcon="🥈"
        nextRankMessage="Còn 650 điểm để lên Vàng"
        progressValue={78}
        tiers={[
          { label: 'Đồng', points: 0, icon: '🥉' },
          { label: 'Bạc', points: 1000, icon: '🥈' },
          { label: 'Vàng', points: 3000, icon: '🥇' },
          { label: 'Kim Cương', points: 10000, icon: '💎' }
        ]}
      />

      <StatsGrid items={stats} />

      <PointsHistoryTable items={pointsHistory} />

      <PointRulesSection categories={pointRules} open={rulesOpen} onOpenChange={setRulesOpen} />
    </div>
  );
}
