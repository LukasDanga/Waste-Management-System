import type { LeaderboardEntry } from '@/services/citizenService';
import { LeaderboardCard } from './LeaderboardCard';

export interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardList({ entries }: LeaderboardListProps) {
  if (entries.length === 0) return null;
  return (
    <ul className="space-y-2 animate-in fade-in duration-300" role="list">
      {entries.map((entry) => (
        <li key={entry.citizenProfileID}>
          <LeaderboardCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}
