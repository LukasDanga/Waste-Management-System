import { CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import type { PointRule } from './types';

interface RulesTableProps {
  rules: PointRule[];
  onEdit: (rule: PointRule) => void;
  onDelete: (id: number) => void;
}

export function RulesTable({ rules, onEdit, onDelete }: RulesTableProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Quy tắc hiện tại</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hoạt động</TableHead>
              <TableHead>Loại rác</TableHead>
              <TableHead>Điều kiện</TableHead>
              <TableHead className="text-right">Điểm</TableHead>
              <TableHead>Áp dụng từ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.wasteTypeLabel}</TableCell>
                <TableCell className="text-sm text-gray-600">{rule.condition}</TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-green-600">+{rule.points}</span>
                </TableCell>
                <TableCell className="text-sm">{rule.appliedFrom}</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Đang áp dụng
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button onClick={() => onEdit(rule)} className="bg-transparent hover:bg-gray-100 h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-transparent hover:bg-red-50 h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => onDelete(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
