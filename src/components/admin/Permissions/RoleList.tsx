import type { Role } from './types';
import { RoleCard } from './RoleCard';

interface RoleListProps {
  roles: Role[];
}

export function RoleList({ roles }: RoleListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách vai trò</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
