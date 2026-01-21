import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import type { PointRule } from './types';

interface RuleFormDialogProps {
  open: boolean;
  editingRule: PointRule | null;
  onClose: () => void;
  onSave: () => void;
}

export function RuleFormDialog({ open, editingRule, onClose, onSave }: RuleFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen : any) => (isOpen ? undefined : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingRule ? 'Chỉnh sửa quy tắc' : 'Thêm quy tắc mới'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tên quy tắc *</Label>
            <Input placeholder="Nhập tên quy tắc..." defaultValue={editingRule?.name} className="bg-input-background" />
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
            <Select defaultValue={editingRule ? 'custom' : 'default'}>
              <SelectTrigger className="bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Mặc định</SelectItem>
                <SelectItem value="weight_gt_5">Khối lượng {'>'} 5kg</SelectItem>
                <SelectItem value="weight_gt_10">Khối lượng {'>'} 10kg</SelectItem>
                <SelectItem value="ai_match">Khớp với AI</SelectItem>
                <SelectItem value="photo_quality">Ảnh chất lượng cao</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Số điểm *</Label>
            <Input type="number" placeholder="Nhập số điểm..." defaultValue={editingRule?.points} className="bg-input-background" />
          </div>

          <div className="space-y-2">
            <Label>Áp dụng từ *</Label>
            <Input type="date" defaultValue="2026-01-12" className="bg-input-background" />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="border border-gray-200 text-gray-700 hover:bg-gray-100">
            Hủy
          </Button>
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
