import { ArrowRight, Building2, Eye, EyeOff, Lock, Recycle, Settings, User, Users } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toastMessages, useToast } from '../hooks/useToast';
import type { UserRole } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LoginPageProps {
  onLogin: (user: { email: string; role: string; name?: string }) => void;
  onNavigateToRegister?: () => void;
}

interface DemoAccount {
  icon: any;
  role: string;
  roleDisplay: string;
  username: string;
  password: string;
  color: string;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('CITIZEN');
  const auth = useAuth();
  const { error: toastError } = useToast();

  const demoAccounts: DemoAccount[] = [
    {
      icon: Users,
      role: 'CITIZEN',
      roleDisplay: 'Người dân',
      username: 'citizen_demo',
      password: 'citizen123',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      icon: Building2,
      role: 'ENTERPRISE',
      roleDisplay: 'Doanh nghiệp',
      username: 'enterprise_demo',
      password: 'enterprise123',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      icon: Settings,
      role: 'SUPER_ADMIN',
      roleDisplay: 'Quản trị viên cấp cao',
      username: 'longdong32120@gmail.com',
      password: '280120051',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  const handleAutoFill = (account: DemoAccount) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedRole(account.role as UserRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (username && password) {
      // Find the role based on username (demo accounts) or fallback to citizen
      const account = demoAccounts.find(acc => acc.username === username);
      const roleCode = (account?.role || selectedRole || 'CITIZEN') as UserRole;

      const result = await auth.login(username, password, selectedRole || roleCode);

      if (result.success && result.user) {
        onLogin({ email: result.user.email, role: result.user.role, name: result.user.name });
        toastMessages.loginSuccess();
      } else if (result.error) {
        setError(result.error);
        toastError(result.error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG5hdHVyZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY4MTkxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Green nature background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <Recycle className="h-10 w-10 text-green-600" />
            </div>
            <span className="text-4xl font-bold">EcoWaste</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Hệ Thống Quản Lý Rác Thải Thông Minh
          </h2>
          <p className="text-lg text-center text-green-50 max-w-md">
            Kết nối cộng đồng, bảo vệ môi trường và tái chế hiệu quả cho một tương lai xanh
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          {/* Logo for mobile */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
              <Recycle className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold">EcoWaste</span>
          </div>

          {/* Login Form */}
          <Card className="p-8 shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập hệ thống</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-sm">Tên đăng nhập</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-input-background"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-input-background"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Role Select */}
              <div className="space-y-2">
                <label className="text-sm">Vai trò</label>
                <Select value={selectedRole} onValueChange={(v: string) => setSelectedRole(v as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CITIZEN">Người dân</SelectItem>
                    <SelectItem value="COLLECTOR">Người thu gom</SelectItem>
                    <SelectItem value="ENTERPRISE">Doanh nghiệp</SelectItem>
                    <SelectItem value="SUPER_ADMIN">Quản trị viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4"
              >
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </form>

            {/* Register Link */}
            {typeof onNavigateToRegister === 'function' && (
              <div className="text-center text-sm text-gray-600 mt-4 pt-4 border-t">
                Chưa có tài khoản?{' '}
                <button
                  onClick={onNavigateToRegister}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Đăng ký ngay
                </button>
              </div>
            )}
          </Card>

          {/* Demo Accounts */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 bg-white inline-block px-4 py-2 rounded-full shadow-sm border">
                📋 Tài khoản demo - Nhấn để điền tự động
              </p>
            </div>

            <div className="grid gap-3">
              {demoAccounts.map((account, index) => {
                const Icon = account.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleAutoFill(account)}
                    className={`${account.color} border-2 rounded-lg p-4 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-left`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <div>
                          <div className="font-semibold text-sm">{account.roleDisplay}</div>
                          <div className="text-xs text-gray-600 font-mono">
                            {account.username} / {account.password}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
