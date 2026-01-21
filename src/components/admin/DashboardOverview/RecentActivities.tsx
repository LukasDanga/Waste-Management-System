import { getColorClasses } from './colorUtils';
import type { RecentActivityItem } from './types';

interface RecentActivitiesProps {
  activities: RecentActivityItem[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const colors = getColorClasses(activity.color);
          return (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
