import { useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import { EnterpriseCard } from './EnterpriseCard';
import { StatsOverview } from './StatsOverview';
import { SearchFilterBar } from './SearchFilterBar';
import { EnterpriseViewDialog } from './EnterpriseViewDialog';
import { EnterpriseEditDialog } from './EnterpriseEditDialog';
import { EnterpriseConfirmDialog } from './EnterpriseConfirmDialog';
import { buildStats, enterprises as seedEnterprises, pendingEnterprises as seedPending } from './mockData';
import type { Enterprise, EnterpriseStatus } from './types';
import { useToast } from '../../../hooks/useToast';

type ConfirmAction = 'suspend' | 'activate' | 'approve' | 'reject';

export function EnterpriseManagement() {
  const [enterpriseList, setEnterpriseList] = useState<Enterprise[]>([...seedEnterprises, ...seedPending]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnterpriseStatus>('all');
  const [viewEnterprise, setViewEnterprise] = useState<Enterprise | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editEnterprise, setEditEnterprise] = useState<Enterprise | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmEnterprise, setConfirmEnterprise] = useState<Enterprise | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const { success } = useToast();

  const stats = useMemo(() => buildStats(enterpriseList), [enterpriseList]);

  const filteredEnterprises = useMemo(() => {
    return enterpriseList.filter((enterprise) => {
      const matchesName = enterprise.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || enterprise.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [enterpriseList, searchTerm, statusFilter]);

  const openView = (enterprise: Enterprise) => {
    setViewEnterprise(enterprise);
    setViewOpen(true);
  };

  const openEdit = (enterprise: Enterprise) => {
    setEditEnterprise(enterprise);
    setEditOpen(true);
  };

  const openConfirm = (enterprise: Enterprise, action: ConfirmAction) => {
    setConfirmEnterprise(enterprise);
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  const updateEnterprise = (id: string, updates: Partial<Enterprise>) => {
    setEnterpriseList((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleEditSave = (updatedEnterprise: Enterprise) => {
    updateEnterprise(updatedEnterprise.id, updatedEnterprise);
    success('Đã cập nhật thông tin doanh nghiệp');
    setEditOpen(false);
    setEditEnterprise(null);
  };

  const handleConfirmAction = (
    enterprise: Enterprise,
    action: ConfirmAction
  ) => {
    const nextStatus: Record<ConfirmAction, EnterpriseStatus> = {
      suspend: 'suspended',
      activate: 'verified',
      approve: 'verified',
      reject: 'suspended',
    };

    const messages: Record<ConfirmAction, string> = {
      suspend: 'Đã đình chỉ doanh nghiệp',
      activate: 'Đã kích hoạt lại doanh nghiệp',
      approve: 'Đã phê duyệt doanh nghiệp',
      reject: 'Đã từ chối doanh nghiệp',
    };

    updateEnterprise(enterprise.id, { status: nextStatus[action] });
    success(messages[action]);
    setConfirmOpen(false);
    setConfirmEnterprise(null);
    setConfirmAction(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý doanh nghiệp</h1>
        <p className="text-gray-600">Quản lý các doanh nghiệp thu gom rác trong hệ thống</p>
      </div>

      {/* Stats */}
      <StatsOverview stats={stats} />
      <SearchFilterBar
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      <div className="space-y-4 mb-6">
        {filteredEnterprises.map((enterprise: Enterprise) => (
          <EnterpriseCard
            key={enterprise.id}
            enterprise={enterprise}
            onView={openView}
            onEdit={openEdit}
            onSuspend={(item) => openConfirm(item, 'suspend')}
            onActivate={(item) => openConfirm(item, 'activate')}
            onApprove={(item) => openConfirm(item, 'approve')}
            onReject={(item) => openConfirm(item, 'reject')}
          />
        ))}
        {filteredEnterprises.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy doanh nghiệp phù hợp</p>
          </div>
        )}
      </div>

      <EnterpriseViewDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setViewEnterprise(null);
        }}
        enterprise={viewEnterprise}
      />

      <EnterpriseEditDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditEnterprise(null);
        }}
        enterprise={editEnterprise}
        onSave={handleEditSave}
      />

      <EnterpriseConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          setConfirmOpen(open);
          if (!open) {
            setConfirmEnterprise(null);
            setConfirmAction(null);
          }
        }}
        enterprise={confirmEnterprise}
        action={confirmAction}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}