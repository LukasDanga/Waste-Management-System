import { Building2, CalendarClock, FileText, Mail, MapPin, Phone, ShieldCheck, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { StatusBadge } from './StatusBadge';
import type { Enterprise } from './types';

interface EnterpriseViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enterprise: Enterprise | null;
}

export function EnterpriseViewDialog({ open, onOpenChange, enterprise }: EnterpriseViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Chi tiết doanh nghiệp</DialogTitle>
        </DialogHeader>
        {enterprise && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-md">
                <Building2 className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{enterprise.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">Doanh nghiệp</Badge>
                  <StatusBadge status={enterprise.status} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Giấy phép & Collector</p>
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">{enterprise.license}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">{enterprise.collectors} collector</span>
                </div>
                {enterprise.registrationDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <CalendarClock className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Đăng ký: {enterprise.registrationDate}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">Liên hệ</p>
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">{enterprise.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">{enterprise.email}</span>
                </div>
                {enterprise.address && (
                  <div className="flex items-start gap-2 text-sm text-gray-800">
                    <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <span className="font-medium">{enterprise.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-5">
              <p className="text-sm text-gray-500 mb-3">Khu vực hoạt động</p>
              <div className="flex flex-wrap gap-2">
                {enterprise.areas.map((area) => (
                  <Badge key={area} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
