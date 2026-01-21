import { Card } from '../../ui/card';

interface StatItem {
  value: string;
  label: string;
  colorClass: string;
}

interface StatsRowProps {
  stats: StatItem[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 mt-6">
      {stats.map((stat) => (
        <Card key={stat.label} className={`p-6 text-center ${stat.colorClass}`}>
          <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
