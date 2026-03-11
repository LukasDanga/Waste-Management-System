import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createRewardPolicy } from '../../../services/enterpriseService';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { PointRule } from './types';

interface RuleFormDialogProps {
  open: boolean;
  editingRule: PointRule | null;
  onClose: () => void;
  onSave: () => void | Promise<void>;
}

export function RuleFormDialog({ open, editingRule, onClose, onSave }: RuleFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    basePoint: '',
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      name: editingRule?.name || '',
      description: editingRule?.condition || '',
      basePoint: editingRule?.points ? String(editingRule.points) : '',
    });
  }, [open, editingRule]);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.description.trim() || !form.basePoint.trim()) {
      toast.error('Vui lòng nhập đầy đủ tên, mô tả và điểm cơ bản');
      return;
    }

    const basePoint = Number(form.basePoint);
    if (!Number.isFinite(basePoint) || basePoint < 0) {
      toast.error('Điểm cơ bản phải là số hợp lệ lớn hơn hoặc bằng 0');
      return;
    }

    setSubmitting(true);
    try {
      await createRewardPolicy({
        name: form.name.trim(),
        description: form.description.trim(),
        basePoint,
      });
      toast.success('Tạo chính sách điểm thưởng thành công');
      await onSave();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Tạo chính sách điểm thưởng thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen : any) => (isOpen ? undefined : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingRule ? 'Chỉnh sửa chính sách điểm thưởng' : 'Thêm chính sách điểm thưởng'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tên chính sách *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nhập tên chính sách..."
              className="bg-input-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Mô tả *</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Nhập mô tả chính sách..."
              className="bg-input-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Điểm cơ bản *</Label>
            <Input
              type="number"
              min={0}
              value={form.basePoint}
              onChange={(e) => setForm((prev) => ({ ...prev, basePoint: e.target.value }))}
              placeholder="Nhập điểm cơ bản..."
              className="bg-input-background"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} disabled={submitting} className="border border-gray-200 text-gray-700 hover:bg-gray-100">
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
            {submitting ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
