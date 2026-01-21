import { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function PointRules() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);

  const rules = [
    {
      id: 1,
      name: 'Báo cáo rác tái chế',
      wasteType: 'recyclable',
      wasteTypeLabel: '♻️ Rác tái chế',
      condition: 'Khối lượng >5kg',
      points: 15,
      status: 'active',
      appliedFrom: '01/01/2026'
    },
    {
      id: 2,
      name: 'Phân loại chính xác',
      wasteType: 'all',
      wasteTypeLabel: 'Tất cả',
      condition: 'Khớp với AI',
      points: 5,
      status: 'active',
      appliedFrom: '01/01/2026'
    },
    {
      id: 3,
      name: 'Báo cáo rác hữu cơ',
      wasteType: 'organic',
      wasteTypeLabel: '🌿 Rác hữu cơ',
      condition: 'Mặc định',
      points: 10,
      status: 'active',
      appliedFrom: '01/01/2026'
    },
    {
      id: 4,
      name: 'Báo cáo rác thông thường',
      wasteType: 'general',
      wasteTypeLabel: '🗑️ Rác thông thường',
      condition: 'Mặc định',
      points: 8,
      status: 'active',
      appliedFrom: '01/01/2026'
    },
    {
      id: 5,
      name: 'Ảnh chất lượng cao',
      wasteType: 'all',
      wasteTypeLabel: 'Tất cả',
      condition: 'AI xác định >90%',
      points: 3,
      status: 'active',
      appliedFrom: '15/01/2026'
    }
  ];

  const handleEdit = (rule: any) => {
    setEditingRule(rule);
    setShowDialog(true);
  };

  const handleDelete = (ruleId: number) => {
    if (confirm('Bạn có chắc muốn xóa quy tắc này?')) {
      alert(`Đã xóa quy tắc #${ruleId}`);
    }
  };

  const handleSave = () => {
    alert(editingRule ? 'Đã cập nhật quy tắc' : 'Đã thêm quy tắc mới');
    setShowDialog(false);
    setEditingRule(null);
  };

  const RuleFormDialog = () => (
    <Dialog open={showDialog} onOpenChange={(open) => {
      setShowDialog(open);
      if (!open) setEditingRule(null);
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingRule ? 'Chỉnh sửa quy tắc' : 'Thêm quy tắc mới'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tên quy tắc *</Label>
            <Input
              placeholder="Nhập tên quy tắc..."
              defaultValue={editingRule?.name}
              className="bg-input-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Loại rác *</Label>
            <Select defaultValue={editingRule?.wasteType || 'all'}>
              <SelectTrigger className="bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="organic">🌿 Rác hữu cơ</SelectItem>
                <SelectItem value="recyclable">♻️ Rác tái chế</SelectItem>
                <SelectItem value="hazardous">⚠️ Rác nguy hại</SelectItem>
                <SelectItem value="general">🗑️ Rác thông thường</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Điều kiện *</Label>
            <Select defaultValue="default">
              <SelectTrigger className="bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Mặc định</SelectItem>
                <SelectItem value="weight_gt_5">Khối lượng &gt; 5kg</SelectItem>
                <SelectItem value="weight_gt_10">Khối lượng &gt; 10kg</SelectItem>
                <SelectItem value="ai_match">Khớp với AI</SelectItem>
                <SelectItem value="photo_quality">Ảnh chất lượng cao</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Số điểm *</Label>
            <Input
              type="number"
              placeholder="Nhập số điểm..."
              defaultValue={editingRule?.points}
              className="bg-input-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Áp dụng từ *</Label>
            <Input
              type="date"
              defaultValue="2026-01-12"
              className="bg-input-background"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setShowDialog(false);
              setEditingRule(null);
            }}
          >
            Hủy
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Cấu hình điểm thưởng</h1>
            <p className="text-gray-600">Quản lý quy tắc tính điểm cho người dân</p>
          </div>
          <Button
            onClick={() => {
              setEditingRule(null);
              setShowDialog(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Thêm quy tắc mới
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div>
            <h3 className="font-bold text-lg mb-2">Hướng dẫn</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Quy tắc sẽ được áp dụng tự động cho tất cả báo cáo từ người dân</li>
              <li>• Có thể thiết lập nhiều quy tắc cho cùng một loại rác</li>
              <li>• Điểm thưởng sẽ được cộng dồn nếu đáp ứng nhiều điều kiện</li>
              <li>• Thay đổi quy tắc chỉ áp dụng cho báo cáo mới, không ảnh hưởng dữ liệu cũ</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Rules Table */}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(rule.id)}
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

      {/* Statistics */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-blue-600 mb-2">5</p>
          <p className="text-sm text-gray-600">Quy tắc đang hoạt động</p>
        </Card>

        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-green-600 mb-2">2,350</p>
          <p className="text-sm text-gray-600">Điểm TB/người dùng</p>
        </Card>

        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-purple-600 mb-2">12.5</p>
          <p className="text-sm text-gray-600">Điểm TB/báo cáo</p>
        </Card>
      </div>

      <RuleFormDialog />
    </div>
  );
}
