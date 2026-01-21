import { PodiumCard } from './PodiumCard';
import type { LeaderboardUser } from './types';

interface PodiumProps {
  topThree: LeaderboardUser[];
}

export function Podium({ topThree }: PodiumProps) {
  return (
    <div className="mb-8">
      <div className="flex items-end justify-center gap-4 mb-6">
        <PodiumCard user={topThree[0]} highlight="second" />
        <PodiumCard user={topThree[1]} highlight="first" />
        <PodiumCard user={topThree[2]} highlight="third" />
      </div>
    </div>
  );
}
