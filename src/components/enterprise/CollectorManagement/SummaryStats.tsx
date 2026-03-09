import { Card } from '../../ui/card';

interface StatItem {
  label: string;
  value: string;
  colorClass: string;
}

interface SummaryStatsProps {
  stats: StatItem[];
}

export function SummaryStats({ stats }: SummaryStatsProps) {
  return (
    <div className="grid sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className={`p-4 ${stat.colorClass}`}>
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
