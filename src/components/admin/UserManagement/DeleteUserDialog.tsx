import { AlertCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import type { User } from './types';

interface DeleteUserDialogProps {
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteUserDialog({ user, onClose, onConfirm }: DeleteUserDialogProps) {
  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-red-600">Xác nhận xóa người dùng</DialogTitle>
          <DialogDescription>Hành động này không thể hoàn tác</DialogDescription>
        </DialogHeader>
        {user && (
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Bạn có chắc chắn muốn xóa người dùng này?</p>
                  <p className="text-sm text-red-700 mt-1">
                    Tất cả dữ liệu liên quan đến <strong>{user.name}</strong> sẽ bị xóa vĩnh viễn khỏi hệ thống.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Vai trò:</strong> {user.role}
              </p>
            </div>
          </div>
        )}
        <DialogFooter className="gap-2">
          <Button onClick={onClose} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
            Hủy
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa người dùng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUserDialog;
