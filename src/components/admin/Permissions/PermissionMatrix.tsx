import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Checkbox } from '../../ui/checkbox';
import type { Permission } from './types';

interface PermissionMatrixProps {
  permissions: Permission[];
}

export function PermissionMatrix({ permissions }: PermissionMatrixProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Ma trận phân quyền</h2>
        <p className="text-sm text-gray-600 mt-1">Quản lý quyền truy cập cho từng vai trò</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Chức năng</TableHead>
              <TableHead className="text-center">Citizen</TableHead>
              <TableHead className="text-center">Enterprise</TableHead>
              <TableHead className="text-center">Collector</TableHead>
              <TableHead className="text-center">Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell className="text-center">
                  {permission.citizen ? (
                    <div className="flex justify-center">
                      <Checkbox checked disabled />
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {permission.enterprise ? (
                    <div className="flex justify-center">
                      <Checkbox checked disabled />
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {permission.collector ? (
                    <div className="flex justify-center">
                      <Checkbox checked disabled />
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {permission.admin ? (
                    <div className="flex justify-center">
                      <Checkbox checked disabled />
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
