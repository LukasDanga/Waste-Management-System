import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Medal } from 'lucide-react';
import type { LeaderboardEntry } from '@/services/citizenService';
import { getAvatarUrl } from './utils';
import { DefaultAvatarIcon } from './DefaultAvatarIcon';
import { cn } from '@/components/ui/utils';

export interface TopPodiumProps {
  topThree: [LeaderboardEntry?, LeaderboardEntry?, LeaderboardEntry?];
}

const rankMedal = ['🥇', '🥈', '🥉'] as const;
const podiumOrder = [1, 0, 2] as const; // visual: 2nd, 1st, 3rd

export function TopPodium({ topThree }: TopPodiumProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-4 items-end justify-items-center animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8"
      style={{ minHeight: '220px' }}
    >
      {podiumOrder.map((index) => {
        const entry = topThree[index];
        const rank = index === 0 ? 2 : index === 1 ? 1 : 3;
        const isFirst = rank === 1;
        if (!entry) {
          return (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center justify-end opacity-50',
                rank === 2 && 'order-2 sm:order-1',
                rank === 1 && 'order-1 sm:order-2',
                rank === 3 && 'order-3',
              )}
            >
              <div className="rounded-full bg-white dark:bg-emerald-950/50 flex items-center justify-center mb-2 text-gray-400 dark:text-emerald-700">
                <DefaultAvatarIcon size={64} />
              </div>
              <div className="h-16 w-full max-w-[100px] rounded-t-lg bg-emerald-100 dark:bg-emerald-900/30" />
            </div>
          );
        }
        const avatarUrl = getAvatarUrl(entry.avatarName);
        return (
          <div
            key={entry.citizenProfileID}
            className={cn(
              'flex flex-col items-center justify-end transition-transform hover:scale-[1.02]',
              rank === 2 && 'order-2 sm:order-1',
              rank === 1 && 'order-1 sm:order-2',
              rank === 3 && 'order-3',
            )}
          >
            <span className="text-2xl sm:text-3xl mb-1" aria-hidden>
              {rankMedal[rank - 1]}
            </span>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-2">
              #{rank}
            </span>
            <Avatar
              className={cn(
                'border-4 border-white dark:border-emerald-900 shadow-lg ring-2 ring-emerald-200 dark:ring-emerald-800 bg-white dark:bg-emerald-950/50',
                isFirst ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-14 w-14 sm:h-16 sm:w-16',
              )}
            >
              <AvatarImage src={avatarUrl} alt={entry.displayName} />
              <AvatarFallback className="bg-white dark:bg-emerald-950/50 text-gray-900 dark:text-emerald-200 p-0 flex items-center justify-center">
                <DefaultAvatarIcon
                  size={isFirst ? 96 : 64}
                  className="text-gray-900 dark:text-emerald-200"
                />
              </AvatarFallback>
            </Avatar>
            <p
              className={cn(
                'font-semibold text-emerald-900 dark:text-emerald-100 mt-2 truncate max-w-[120px] text-center',
                isFirst && 'text-base sm:text-lg',
              )}
            >
              {entry.displayName || 'Ẩn danh'}
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-0.5">
              {entry.totalPoints} điểm
            </p>
            <div
              className={cn(
                'w-full max-w-[100px] rounded-t-lg flex items-center justify-center pt-2',
                isFirst &&
                  'bg-gradient-to-t from-amber-400 to-amber-300 dark:from-amber-600 dark:to-amber-500 h-20 sm:h-24',
                rank === 2 && 'bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 h-14 sm:h-16',
                rank === 3 && 'bg-gradient-to-t from-amber-700/80 to-amber-600/80 dark:from-amber-800 dark:to-amber-700 h-12 sm:h-14',
              )}
            >
              {isFirst && <Medal className="h-6 w-6 text-white" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
