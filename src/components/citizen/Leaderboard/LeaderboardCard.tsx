import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/services/citizenService';
import { getAvatarUrl } from './utils';
import { DefaultAvatarIcon } from './DefaultAvatarIcon';
import { cn } from '@/components/ui/utils';

export interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  className?: string;
}

export function LeaderboardCard({ entry, className }: LeaderboardCardProps) {
  const avatarUrl = getAvatarUrl(entry.avatarName);
  return (
    <div
      className={cn(
        'flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-emerald-950/20 transition-colors hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800',
        className,
      )}
    >
      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 w-7 shrink-0">
        #{entry.rank}
      </span>
      <Avatar className="h-10 w-10 shrink-0 border-2 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-emerald-950/50">
        <AvatarImage src={avatarUrl} alt={entry.displayName} />
        <AvatarFallback className="bg-white dark:bg-emerald-950/50 text-gray-900 dark:text-emerald-200 p-0 flex items-center justify-center">
          <DefaultAvatarIcon size={40} className="text-gray-900 dark:text-emerald-200" />
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 font-medium text-emerald-900 dark:text-emerald-100 truncate">
        {entry.displayName || 'Ẩn danh'}
      </span>
      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
        {entry.totalPoints} điểm
      </span>
    </div>
  );
}
