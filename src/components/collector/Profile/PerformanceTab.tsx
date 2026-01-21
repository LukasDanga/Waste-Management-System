import { Award } from 'lucide-react';
import type { Achievement, PerformanceStat } from './types';

interface PerformanceTabProps {
  stats: PerformanceStat[];
  achievements: Achievement[];
}

const toneClasses: Record<PerformanceStat['tone'], { bg: string; text: string; helper: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', helper: 'text-emerald-600' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', helper: 'text-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', helper: 'text-amber-600' },
};

export function PerformanceTab({ stats, achievements }: PerformanceTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Thành tích làm việc</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const tone = toneClasses[stat.tone];
          return (
            <div key={stat.label} className={`${tone.bg} rounded-lg p-4`}>
              <p className={`text-sm ${tone.text} mb-1`}>{stat.label}</p>
              <p className={`text-3xl font-bold ${tone.text}`}>{stat.value}</p>
              <p className={`text-xs ${tone.helper} mt-1`}>{stat.helper}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Huy hiệu & Thành tựu</h4>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div key={item.title} className={`flex items-center gap-3 p-4 rounded-lg border ${item.colorClass}`}>
              <Award className="w-8 h-8" />
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
