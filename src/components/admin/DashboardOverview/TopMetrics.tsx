import { MetricItem } from './types';
import { getColorClasses } from './colorUtils';

interface TopMetricsProps {
  metrics: MetricItem[];
}

export function TopMetrics({ metrics }: TopMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colors = getColorClasses(metric.color);
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <span
                className={`text-sm font-medium ${
                  metric.change.startsWith('+')
                    ? 'text-green-600'
                    : metric.change.startsWith('-')
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </div>
        );
      })}
    </div>
  );
}
