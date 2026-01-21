import { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, XCircle, AlertCircle, Mail, Phone, Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';
import { AddUserDialog } from './AddUserDialog';
import { ViewUserDialog } from './ViewUserDialog';
import { EditUserDialog } from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { UserActionCell } from './UserActionCell';
import { UserFilters } from './UserFilters';
import type { User, UserFormData } from './types';

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('citizen');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [viewUserDialog, setViewUserDialog] = useState<User | null>(null);
  const [editUserDialog, setEditUserDialog] = useState<User | null>(null);
  const [deleteUserDialog, setDeleteUserDialog] = useState<User | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    password: '',
  });

  const citizens: User[] = [
    { 
      id: '1', 
      name: 'Nguyễn Văn A', 
      email: 'nguyenvana@mail.com', 
      phone: '0901234567',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      role: 'Citizen', 
      status: 'active', 
      createdAt: '01/01/2026' 
    },
    { 
      id: '2', 
      name: 'Trần Thị B', 
      email: 'tranthib@mail.com', 
      phone: '0902345678',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
      role: 'Citizen', 
      status: 'active', 
      createdAt: '02/01/2026' 
    },
    { 
      id: '3', 
      name: 'Lê Văn C', 
      email: 'levanc@mail.com', 
      phone: '0903456789',
      address: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
      role: 'Citizen', 
      status: 'suspended', 
      createdAt: '05/01/2026' 
    },
    { 
      id: '4', 
      name: 'Phạm Thị D', 
      email: 'phamthid@mail.com', 
      phone: '0904567890',
      address: '321 Điện Biên Phủ, Quận 10, TP.HCM',
      role: 'Citizen', 
      status: 'active', 
      createdAt: '08/01/2026' 
    },
    { 
      id: '5', 
      name: 'Hoàng Văn E', 
      email: 'hoangvane@mail.com', 
      phone: '0905678901',
      address: '654 Cách Mạng Tháng 8, Tân Bình, TP.HCM',
      role: 'Citizen', 
      status: 'active', 
      createdAt: '10/01/2026' 
    },
  ];

  const enterprises: User[] = [
    { 
      id: '6', 
      name: 'Green Recycle Co.', 
      email: 'contact@greenrecycle.vn', 
      phone: '0281234567',
      address: '100 Nguyễn Văn Linh, Quận 7, TP.HCM',
      role: 'Enterprise', 
      status: 'active', 
      createdAt: '15/12/2025' 
    },
    { 
      id: '7', 
      name: 'Eco Solutions Ltd', 
      email: 'info@ecosolutions.vn', 
      phone: '0282345678',
      address: '200 Võ Văn Kiệt, Quận 1, TP.HCM',
      role: 'Enterprise', 
      status: 'active', 
      createdAt: '20/12/2025' 
    },
    { 
      id: '8', 
      name: 'Clean Earth Inc', 
      email: 'admin@cleanearth.vn', 
      phone: '0283456789',
      address: '300 Lý Thường Kiệt, Quận 11, TP.HCM',
      role: 'Enterprise', 
      status: 'suspended', 
      createdAt: '05/01/2026' 
    },
  ];

  const collectors: User[] = [
    { 
      id: '9', 
      name: 'Nguyễn Văn B', 
      email: 'collector1@mail.com', 
      phone: '0906789012',
      address: '11 Hoàng Sa, Quận 3, TP.HCM',
      role: 'Collector', 
      status: 'active', 
      createdAt: '01/12/2025' 
    },
    { 
      id: '10', 
      name: 'Trần Văn F', 
      email: 'collector2@mail.com', 
      phone: '0907890123',
      address: '22 Trường Sa, Phú Nhuận, TP.HCM',
      role: 'Collector', 
      status: 'active', 
      createdAt: '10/12/2025' 
    },
    { 
      id: '11', 
      name: 'Lê Thị G', 
      email: 'collector3@mail.com', 
      phone: '0908901234',
      address: '33 Bà Huyện Thanh Quan, Quận 3, TP.HCM',
      role: 'Collector', 
      status: 'active', 
      createdAt: '15/12/2025' 
    },
  ];

  const admins: User[] = [
    { 
      id: '12', 
      name: 'Admin User', 
      email: 'admin@ecowaste.vn', 
      phone: '0909012345',
      address: '44 Phan Đình Phùng, Quận 1, TP.HCM',
      role: 'Admin', 
      status: 'active', 
      createdAt: '01/11/2025' 
    },
    { 
      id: '13', 
      name: 'Super Admin', 
      email: 'superadmin@ecowaste.vn', 
      phone: '0900123456',
      address: '55 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM',
      role: 'Super Admin', 
      status: 'active', 
      createdAt: '01/11/2025' 
    },
  ];

  const currentUsers = useMemo(() => {
    switch (activeTab) {
      case 'citizen':
        return citizens;
      case 'enterprise':
        return enterprises;
      case 'collector':
        return collectors;
      case 'admin':
        return admins;
      default:
        return [];
    }
  }, [activeTab]);

  const getStatusBadge = (status: string) => {
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

  const filteredUsers = useMemo(() =>
    currentUsers.filter((user) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    }),
    [currentUsers, searchQuery, statusFilter]
  );

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    toast.success('✅ Thêm người dùng thành công!', {
      description: `${formData.name} đã được thêm vào hệ thống.`,
    });

    setIsAddUserOpen(false);
    setFormData({ name: '', email: '', phone: '', address: '', role: '', password: '' });
  };

  const handleEditUser = () => {
    toast.success('✅ Cập nhật thông tin thành công!', {
      description: `Thông tin của ${editUserDialog?.name} đã được cập nhật.`,
    });
    setEditUserDialog(null);
  };

  const handleDeleteUser = () => {
    toast.success('✅ Xóa người dùng thành công!', {
      description: `${deleteUserDialog?.name} đã được xóa khỏi hệ thống.`,
    });
    setDeleteUserDialog(null);
  };

  const handleToggleSuspend = (user: User) => {
    if (user.status === 'active') {
      toast.warning('⚠️ Đã tạm khóa tài khoản!', {
        description: `Tài khoản của ${user.name} đã bị tạm khóa.`,
      });
    } else {
      toast.success('✅ Đã mở khóa tài khoản!', {
        description: `Tài khoản của ${user.name} đã được kích hoạt lại.`,
      });
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
            <p className="text-gray-600">Quản lý tất cả người dùng trong hệ thống EcoWaste</p>
          </div>
          <AddUserDialog
            open={isAddUserOpen}
            onOpenChange={setIsAddUserOpen}
            formData={formData}
            onFormChange={(data) => setFormData({ ...formData, ...data })}
            onSubmit={handleAddUser}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="citizen" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            👤 Citizen ({citizens.length})
          </TabsTrigger>
          <TabsTrigger value="enterprise" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            🏢 Enterprise ({enterprises.length})
          </TabsTrigger>
          <TabsTrigger value="collector" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            🚛 Collector ({collectors.length})
          </TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            ⚙️ Admin ({admins.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* User Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Tên</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Số điện thoại</TableHead>
                <TableHead className="font-semibold">Vai trò</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold">Ngày tạo</TableHead>
                <TableHead className="text-right font-semibold w-[240px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {user.phone}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {user.createdAt}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <UserActionCell
                      user={user}
                      onView={setViewUserDialog}
                      onEdit={setEditUserDialog}
                      onToggleSuspend={handleToggleSuspend}
                      onDelete={setDeleteUserDialog}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Không tìm thấy người dùng nào</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
          </div>
        )}
      </div>

      <ViewUserDialog user={viewUserDialog} onClose={() => setViewUserDialog(null)} />
      <EditUserDialog user={editUserDialog} onClose={() => setEditUserDialog(null)} onSubmit={handleEditUser} />
      <DeleteUserDialog user={deleteUserDialog} onClose={() => setDeleteUserDialog(null)} onConfirm={handleDeleteUser} />
    </div>
  );
}
