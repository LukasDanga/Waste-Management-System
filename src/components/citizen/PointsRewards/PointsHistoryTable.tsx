import { Card } from '../../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import type { PointsHistoryItem } from './types';

interface PointsHistoryTableProps {
  items: PointsHistoryItem[];
}

export function PointsHistoryTable({ items }: PointsHistoryTableProps) {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Lịch sử điểm</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày</TableHead>
              <TableHead>Hoạt động</TableHead>
              <TableHead className="text-right">Điểm</TableHead>
              <TableHead className="text-right">Tổng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={`${item.date}-${index}`}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell>{item.activity}</TableCell>
                <TableCell className="text-right">
                  <span className="text-green-600 font-semibold">{item.points}</span>
                </TableCell>
                <TableCell className="text-right font-semibold">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
