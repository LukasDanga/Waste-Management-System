import { useEffect, useState, useCallback } from 'react';
import { fetchCitizenAreas, fetchLeaderboard } from '@/services/citizenService';
import type { CitizenArea, LeaderboardEntry } from '@/services/citizenService';
import { LeaderboardHeader } from './LeaderboardHeader';
import { AreaSelector } from './AreaSelector';
import { TopPodium } from './TopPodium';
import { LeaderboardList } from './LeaderboardList';
import { EmptyState } from './EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MOCK_AREA_THANH_HOA,
  MOCK_LEADERBOARD_THANH_HOA,
  MOCK_THANH_HOA_AREA_ID,
} from './mockLeaderboard';

export function Leaderboard() {
  const [areas, setAreas] = useState<CitizenArea[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [areasLoading, setAreasLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setAreasLoading(true);
    setError(null);
    fetchCitizenAreas()
      .then((list) => {
        if (!cancelled) {
          const withMock = [MOCK_AREA_THANH_HOA, ...list.filter((a) => a.citizenAreaID !== MOCK_THANH_HOA_AREA_ID)];
          setAreas(withMock);
          if (withMock.length > 0 && !selectedAreaId) {
            setSelectedAreaId(withMock[0].citizenAreaID);
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAreas([MOCK_AREA_THANH_HOA]);
          setSelectedAreaId(MOCK_THANH_HOA_AREA_ID);
        }
      })
      .finally(() => {
        if (!cancelled) setAreasLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadLeaderboard = useCallback((citizenAreaId: string) => {
    if (!citizenAreaId) {
      setLeaderboard([]);
      return;
    }
    if (citizenAreaId === MOCK_THANH_HOA_AREA_ID) {
      setLeaderboardLoading(true);
      setError(null);
      setLeaderboard(MOCK_LEADERBOARD_THANH_HOA);
      setLeaderboardLoading(false);
      return;
    }
    setLeaderboardLoading(true);
    setError(null);
    fetchLeaderboard(citizenAreaId)
      .then(setLeaderboard)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Không tải được bảng xếp hạng');
        setLeaderboard([]);
      })
      .finally(() => setLeaderboardLoading(false));
  }, []);

  useEffect(() => {
    if (selectedAreaId) loadLeaderboard(selectedAreaId);
    else setLeaderboard([]);
  }, [selectedAreaId, loadLeaderboard]);

  const topThree: [LeaderboardEntry?, LeaderboardEntry?, LeaderboardEntry?] = [
    leaderboard[0],
    leaderboard[1],
    leaderboard[2],
  ];
  const rest = leaderboard.slice(3);
  const isEmpty = !leaderboardLoading && leaderboard.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/30 dark:to-background">
      <div className="container max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <LeaderboardHeader />

        <div className="flex flex-col items-center gap-6 mb-8">
          {areasLoading ? (
            <Skeleton className="h-9 w-full max-w-xs rounded-md" />
          ) : (
            <AreaSelector
              areas={areas}
              value={selectedAreaId}
              onValueChange={setSelectedAreaId}
              disabled={areas.length === 0}
              placeholder="Chọn khu vực"
            />
          )}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          )}
        </div>

        {leaderboardLoading ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-3 gap-4 items-end justify-items-center min-h-[220px]">
              <Skeleton className="h-32 w-full max-w-[100px] rounded-t-lg" />
              <Skeleton className="h-40 w-full max-w-[100px] rounded-t-lg" />
              <Skeleton className="h-28 w-full max-w-[100px] rounded-t-lg" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <TopPodium topThree={topThree} />
            {rest.length > 0 && (
              <section aria-label="Danh sách xếp hạng">
                <LeaderboardList entries={rest} />
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
