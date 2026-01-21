import { FiltersBar } from './FiltersBar';
import { Podium } from './Podium';
import { RankingsTable } from './RankingsTable';
import { YourPositionCard } from './YourPositionCard';
import type { LeaderboardUser } from './types';

export function Leaderboard() {
  const topThree: LeaderboardUser[] = [
    {
      rank: 2,
      name: 'Trần Văn B',
      district: 'Quận 3',
      points: 4890,
      reports: 326,
    },
    {
      rank: 1,
      name: 'Nguyễn Thị A',
      district: 'Quận 1',
      points: 5230,
      reports: 348,
    },
    {
      rank: 3,
      name: 'Lê Minh C',
      district: 'Quận 5',
      points: 4120,
      reports: 274,
    }
  ];

  const rankings: LeaderboardUser[] = [
    { rank: 4, name: 'Phạm Thị D', district: 'Quận 1', points: 3850, reports: 257 },
    { rank: 5, name: 'Hoàng Văn E', district: 'Quận 2', points: 3620, reports: 241 },
    { rank: 6, name: 'Võ Thị F', district: 'Quận 4', points: 3480, reports: 232 },
    { rank: 7, name: 'Đặng Văn G', district: 'Quận 7', points: 3290, reports: 219 },
    { rank: 8, name: 'Bùi Thị H', district: 'Quận 3', points: 3150, reports: 210 },
    { rank: 9, name: 'Ngô Văn I', district: 'Quận 6', points: 2980, reports: 198 },
    { rank: 10, name: 'Trương Thị K', district: 'Quận 8', points: 2850, reports: 190 }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Bảng xếp hạng 🏆</h1>
        <p className="text-gray-600">Xem thành tích của bạn so với cộng đồng</p>
      </div>

      <FiltersBar />

      <Podium topThree={topThree} />

      <RankingsTable rankings={rankings} />

      <YourPositionCard />

      {/* Motivational Message */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          💪 Tiếp tục báo cáo rác để cải thiện thứ hạng và giành phần thưởng!
        </p>
      </div>
    </div>
  );
}
