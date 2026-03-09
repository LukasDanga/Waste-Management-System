import { CheckCircle2, Clock, Star, TrendingUp } from 'lucide-react';
import type { HistoryStats } from './types';

interface SummaryStatsProps {
  stats: HistoryStats;
}

export function SummaryStats({ stats }: SummaryStatsProps) {
  const cards = [
    {
      label: 'Tổng công việc',
      value: stats.total,
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    },
    {
      label: 'Tỷ lệ hoàn thành',
      value: `${stats.completionRate}%`,
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
    },
    {
      label: 'Thời gian TB',
      value: `${stats.avgTime} phút`,
      icon: <Clock className="w-5 h-5 text-orange-600" />,
    },
    {
      label: 'Đánh giá TB',
      value: `${stats.avgRating} ⭐`,
      icon: <Star className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{card.label}</span>
            {card.icon}
          </div>
          <div className="text-3xl font-bold text-gray-900">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
