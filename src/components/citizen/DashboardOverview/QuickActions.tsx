import { Card } from '../../ui/card';
import type { QuickAction } from './types';

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {actions.map((action) => {
        const isPrimary = action.style === 'primary';
        return (
          <Card
            key={action.title}
            className={
              isPrimary
                ? 'p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white cursor-pointer hover:shadow-lg transition-shadow'
                : 'p-6 border-2 border-green-200 cursor-pointer hover:shadow-lg transition-shadow bg-white'
            }
            onClick={action.onClick}
          >
            <div className="flex items-center gap-4">
              <div className={isPrimary ? 'p-3 bg-white/20 rounded-lg' : 'p-3 bg-green-100 rounded-lg'}>
                <action.icon className={`h-8 w-8 ${isPrimary ? '' : 'text-green-600'}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{action.title}</h3>
                <p className={isPrimary ? 'text-green-50 text-sm' : 'text-gray-600 text-sm'}>{action.subtitle}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
