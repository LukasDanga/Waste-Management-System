import type { StatItem } from './types';

interface StatsOverviewProps {
  stats: StatItem[];
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
}
