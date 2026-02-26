import { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Mail, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { UserFilters } from './UserFilters';
import type { User } from './types';
import { userService } from '../../../services/IAMService/api.service';
import { toast } from 'sonner';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await userService.getIamUsers('SORT_BY_IDENTITY');
        const list = Array.isArray(res.data) ? res.data : [];
        setUsers(list as User[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getStatusBadge = (isActive: boolean) => (
    <Badge className={isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
      {isActive ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
      {isActive ? 'Hoạt động' : 'Ngưng'}
    </Badge>
  );

  const filteredUsers = useMemo(() =>
    users.filter((user) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'inactive' && !user.isActive);
      return matchesSearch && matchesStatus;
    }),
    [users, searchQuery, statusFilter]
  );

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
        <p className="text-gray-600">Danh sách người dùng từ IAM, sắp xếp theo danh tính</p>
      </div>

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-4">
        {loading && (
          <div className="p-6 text-center text-gray-600">Đang tải danh sách người dùng...</div>
        )}
        {error && (
          <div className="p-6 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Họ tên</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Giới tính</TableHead>
                  <TableHead className="font-semibold">Tuổi</TableHead>
                  <TableHead className="font-semibold">Ngày sinh</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold text-right w-[160px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.userID} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium text-gray-900">{user.fullName}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.gender || '—'}</TableCell>
                    <TableCell className="text-gray-600">{user.age ?? '—'}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(user.dob)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="h-9 w-9 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-700"
                          title="Xem"
                          onClick={() => toast.info('Tính năng đang phát triển')}
                        >
                          <Eye className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          type="button"
                          className="h-9 w-9 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 text-gray-600 hover:text-green-700"
                          title="Sửa"
                          onClick={() => toast.info('Tính năng đang phát triển')}
                        >
                          <Edit className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          type="button"
                          className="h-9 w-9 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-700"
                          title="Xóa"
                          onClick={() => toast.info('Tính năng đang phát triển')}
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Không tìm thấy người dùng nào</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
          </div>
        )}
      </div>
    </div>
  );
}
