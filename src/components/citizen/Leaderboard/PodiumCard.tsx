import { Card } from '../../ui/card';
import type { LeaderboardUser } from './types';

interface PodiumCardProps {
  user: LeaderboardUser;
  highlight?: 'first' | 'second' | 'third';
}

export function PodiumCard({ user, highlight }: PodiumCardProps) {
  const medal = highlight === 'first' ? '🥇' : highlight === 'second' ? '🥈' : '🥉';
  const bgClass =
    highlight === 'first'
      ? 'bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-yellow-400 transform scale-110 shadow-xl'
      : highlight === 'second'
      ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300'
      : 'bg-gradient-to-br from-orange-100 to-amber-200 border-2 border-orange-300';

  const widthClass = highlight === 'first' ? 'w-52' : 'w-48';
  const medalSize = highlight === 'first' ? 'text-6xl' : 'text-5xl';

  return (
    <Card className={`p-6 text-center ${widthClass} ${bgClass}`}>
      <div className={`${medalSize} mb-2`}>{medal}</div>
      <div className={highlight === 'first' ? 'text-5xl mb-2' : 'text-4xl mb-2'}>{user.avatar}</div>
      <h3 className="font-bold mb-1">{user.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{user.district}</p>
      <div className={highlight === 'first' ? 'text-3xl font-bold text-yellow-700' : 'text-2xl font-bold text-gray-700'}>
        {user.points.toLocaleString()}
      </div>
      <p className="text-xs text-gray-500">điểm</p>
    </Card>
  );
}
