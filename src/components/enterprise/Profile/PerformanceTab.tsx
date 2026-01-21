import { Award } from 'lucide-react';
import type { Achievement, PerformanceStat } from './types';

interface PerformanceTabProps {
  stats: PerformanceStat[];
  achievements: Achievement[];
}

const toneStyles: Record<PerformanceStat['tone'], { bg: string; text: string; label: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'text-emerald-700' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'text-blue-700' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'text-amber-700' },
};

export function PerformanceTab({ stats, achievements }: PerformanceTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Hiệu suất hoạt động</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const tone = toneStyles[stat.tone];
          return (
            <div key={stat.label} className={`${tone.bg} rounded-lg p-4`}>
              <p className={`text-sm ${tone.label} mb-1`}>{stat.label}</p>
              <p className={`text-3xl font-bold ${tone.text}`}>{stat.value}</p>
              <p className={`text-xs ${tone.text} mt-1`}>{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Thành tích nổi bật</h4>
        {achievements.map((item) => (
          <div key={item.title} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Award className={`w-8 h-8 ${item.iconColor}`} />
            <div>
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
