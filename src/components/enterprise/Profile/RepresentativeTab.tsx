import { Mail, Phone } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { EnterpriseProfile } from './types';

interface RepresentativeTabProps {
  profileData: EnterpriseProfile;
  onFieldChange: (field: keyof EnterpriseProfile, value: string) => void;
  onSave: () => void;
}

export function RepresentativeTab({ profileData, onFieldChange, onSave }: RepresentativeTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin người đại diện</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="representativeName">Họ và tên *</Label>
          <Input
            id="representativeName"
            value={profileData.representativeName}
            onChange={(e) => onFieldChange('representativeName', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="representativePosition">Chức vụ *</Label>
          <Input
            id="representativePosition"
            value={profileData.representativePosition}
            onChange={(e) => onFieldChange('representativePosition', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="representativeEmail">Email *</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="representativeEmail"
              type="email"
              value={profileData.representativeEmail}
              onChange={(e) => onFieldChange('representativeEmail', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="representativePhone">Số điện thoại *</Label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="representativePhone"
              type="tel"
              value={profileData.representativePhone}
              onChange={(e) => onFieldChange('representativePhone', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onSave}>
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
}
