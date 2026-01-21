import { Calendar, CheckCircle2, Mail, MapPin, Phone, XCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Separator } from '../../ui/separator';
import type { User } from './types';

interface ViewUserDialogProps {
  user: User | null;
  onClose: () => void;
}

const getStatusBadge = (status: User['status']) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Hoạt động
        </Badge>
      );
    case 'suspended':
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Tạm khóa
        </Badge>
      );
    case 'deleted':
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Đã xóa
        </Badge>
      );
    default:
      return null;
  }
};

export function ViewUserDialog({ user, onClose }: ViewUserDialogProps) {
  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Chi tiết người dùng</DialogTitle>
        </DialogHeader>
        {user && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-2xl">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{user.role}</Badge>
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-500">Email</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Số điện thoại</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <p className="font-medium text-gray-900">{user.phone || 'Chưa cập nhật'}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-500">Địa chỉ</Label>
                <div className="flex items-start gap-2 mt-1.5">
                  <MapPin className="w-4 h-4 text-purple-600 mt-0.5" />
                  <p className="font-medium text-gray-900">{user.address || 'Chưa cập nhật'}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Ngày tạo</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <p className="font-medium text-gray-900">{user.createdAt}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Mã người dùng</Label>
                <p className="font-medium text-gray-900 mt-1.5 font-mono">#{user.id}</p>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
