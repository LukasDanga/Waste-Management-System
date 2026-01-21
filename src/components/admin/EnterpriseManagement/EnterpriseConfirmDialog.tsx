import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../ui/dialog';
import { Button } from '../../ui/button';
import type { Enterprise } from './types';

interface EnterpriseConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enterprise: Enterprise | null;
  action: 'suspend' | 'activate' | 'approve' | 'reject' | null;
  onConfirm: (enterprise: Enterprise, action: NonNullable<EnterpriseConfirmDialogProps['action']>) => void;
}

const ACTION_COPY: Record<NonNullable<EnterpriseConfirmDialogProps['action']>, { title: string; description: string; confirmLabel: string; tone: 'destructive' | 'default' | 'accent' }> = {
  suspend: {
    title: 'Đình chỉ doanh nghiệp',
    description: 'Doanh nghiệp sẽ bị tạm ngưng hoạt động và không thể nhận nhiệm vụ mới.',
    confirmLabel: 'Đình chỉ',
    tone: 'destructive',
  },
  activate: {
    title: 'Kích hoạt lại doanh nghiệp',
    description: 'Doanh nghiệp sẽ được khôi phục và có thể nhận nhiệm vụ bình thường.',
    confirmLabel: 'Kích hoạt',
    tone: 'accent',
  },
  approve: {
    title: 'Duyệt doanh nghiệp',
    description: 'Xác nhận doanh nghiệp này hợp lệ và cho phép hoạt động.',
    confirmLabel: 'Duyệt',
    tone: 'accent',
  },
  reject: {
    title: 'Từ chối doanh nghiệp',
    description: 'Doanh nghiệp sẽ không được chấp thuận. Hành động này có thể được đảo ngược sau.',
    confirmLabel: 'Từ chối',
    tone: 'destructive',
  },
};

export function EnterpriseConfirmDialog({ open, onOpenChange, enterprise, action, onConfirm }: EnterpriseConfirmDialogProps) {
  if (!enterprise || !action) return null;

  const copy = ACTION_COPY[action];
  const handleConfirm = () => onConfirm(enterprise, action);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border border-dashed bg-muted/50 p-4">
          <div className="text-sm font-semibold text-foreground">{enterprise.name}</div>
          <div className="text-xs text-muted-foreground">{enterprise.email} • {enterprise.phone}</div>
          <div className="text-xs text-muted-foreground">Giấy phép: {enterprise.license}</div>
        </div>
        <DialogFooter className="mt-2">
          <Button onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button
            className={`${copy.tone === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''} ${copy.tone === 'accent' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
            onClick={handleConfirm}
          >
            {copy.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
