import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { RuleFormDialog } from './RuleFormDialog';
import { RuleInfoCard } from './RuleInfoCard';
import { RulesTable } from './RulesTable';
import { StatsRow } from './StatsRow';
import type { PointRule } from './types';

export function PointRules() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<PointRule | null>(null);

  const rules: PointRule[] = [
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

  const stats = [
    { value: '5', label: 'Quy tắc đang hoạt động', colorClass: 'border border-blue-100 bg-blue-50' },
    { value: '2,350', label: 'Điểm TB/người dùng', colorClass: 'border border-green-100 bg-green-50' },
    { value: '12.5', label: 'Điểm TB/báo cáo', colorClass: 'border border-purple-100 bg-purple-50' }
  ];

  const handleEdit = (rule: PointRule) => {
    setEditingRule(rule);
    setShowDialog(true);
  };

  const handleDelete = (ruleId: number) => {
    if (confirm('Bạn có chắc muốn xóa quy tắc này?')) {
      alert(`Đã xóa quy tắc #${ruleId}`);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingRule(null);
  };

  const handleSave = () => {
    setEditingRule(null);
  };

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

      <RuleInfoCard />

      <RulesTable rules={rules} onEdit={handleEdit} onDelete={handleDelete} />

      <StatsRow stats={stats} />

      <RuleFormDialog
        open={showDialog}
        editingRule={editingRule}
        onClose={handleCloseDialog}
        onSave={handleSave}
      />
    </div>
  );
}
