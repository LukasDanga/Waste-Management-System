import { MapPin, Phone, Mail, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import type { User } from './types';

interface EditUserDialogProps {
  user: User | null;
  onClose: () => void;
  onSubmit: () => void;
}

export function EditUserDialog({ user, onClose, onSubmit }: EditUserDialogProps) {
  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Chỉnh sửa thông tin</DialogTitle>
          <DialogDescription>Cập nhật thông tin cho {user?.name}</DialogDescription>
        </DialogHeader>
        {user && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="edit-name">Họ và tên</Label>
                <Input id="edit-name" defaultValue={user.name} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="edit-email" type="email" defaultValue={user.email} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-phone">Số điện thoại</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="edit-phone" defaultValue={user.phone} className="pl-10" />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="edit-address">Địa chỉ</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea id="edit-address" defaultValue={user.address} className="pl-10 min-h-[80px]" />
                </div>
              </div>
            </div>
          </div>
        )}
        <DialogFooter className="gap-2">
          <Button className="border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            Hủy
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={onSubmit}>
            <Edit className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
