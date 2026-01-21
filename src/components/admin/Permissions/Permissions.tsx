import { CreateRoleDialog } from './CreateRoleDialog';
import { RoleList } from './RoleList';
import { PermissionMatrix } from './PermissionMatrix';
import { roles, permissions } from './mockData';

export function Permissions() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Phân quyền</h1>
            <p className="text-gray-600">Quản lý vai trò và quyền hạn trong hệ thống</p>
          </div>
          <CreateRoleDialog />
        </div>
      </div>

      <RoleList roles={roles} />
      <PermissionMatrix permissions={permissions} />
    </div>
  );
}
