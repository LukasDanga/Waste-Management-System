import { Shield } from 'lucide-react';
import { Badge } from '../../ui/badge';
import type { ProfileData } from './types';

interface ProfileHeaderProps {
  profile: ProfileData;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
          <Shield className="w-12 h-12 text-emerald-600" />
        </div>
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-1">{profile.fullName}</h2>
          <p className="text-emerald-100">
            {profile.position} • ID: {profile.adminId}
          </p>
          <div className="flex gap-3 mt-3">
            <Badge className="bg-white/20 text-white hover:bg-white/30">🛡️ Super Admin</Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30">✓ Đã xác thực</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
