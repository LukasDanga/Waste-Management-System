import { Card } from '../../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import type { LeaderboardUser } from './types';

interface RankingsTableProps {
  rankings: LeaderboardUser[];
}

const medalForRank = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

export function RankingsTable({ rankings }: RankingsTableProps) {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Bảng xếp hạng</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Khu vực</TableHead>
              <TableHead className="text-right">Điểm</TableHead>
              <TableHead className="text-right">Báo cáo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.map((user) => (
              <TableRow key={user.rank}>
                <TableCell className="font-bold">{medalForRank(user.rank)}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.district}</TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  {user.points.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{user.reports}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
