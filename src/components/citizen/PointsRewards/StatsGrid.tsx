import { Card } from '../../ui/card';
import type { ReactNode } from 'react';

interface StatItem {
  icon: ReactNode;
  value: string;
  label: string;
  iconBgClass: string;
}

interface StatsGridProps {
  items: StatItem[];
}

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-6">
      {items.map((item) => (
        <Card key={item.label} className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-lg ${item.iconBgClass}`}>{item.icon}</div>
            <div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
