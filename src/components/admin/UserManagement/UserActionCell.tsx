import { Ban, Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { User } from './types';

interface UserActionCellProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onToggleSuspend: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserActionCell({ user, onView, onEdit, onToggleSuspend, onDelete }: UserActionCellProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        className="h-9 w-9 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        title="Xem chi tiết"
        onClick={() => onView(user)}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        className="h-9 w-9 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
        title="Chỉnh sửa"
        onClick={() => onEdit(user)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        className="h-9 w-9 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
        title={user.status === 'active' ? 'Tạm khóa' : 'Mở khóa'}
        onClick={() => onToggleSuspend(user)}
      >
        <Ban className="w-4 h-4" />
      </Button>
      <Button
        className="h-9 w-9 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        title="Xóa"
        onClick={() => onDelete(user)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
