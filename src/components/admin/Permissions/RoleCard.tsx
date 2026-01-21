import { Shield, Edit, Users } from 'lucide-react';
import type { Role } from './types';

interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{role.name}</div>
            {role.isCustom && <span className="text-xs text-purple-600">Tùy chỉnh</span>}
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded" aria-label="Chỉnh sửa vai trò">
          <Edit className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-3">{role.description}</p>
      <div className="flex items-center gap-2 text-sm">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{role.userCount} người dùng</span>
      </div>
    </div>
  );
}
