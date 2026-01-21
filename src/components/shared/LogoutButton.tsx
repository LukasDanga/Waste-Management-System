import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../hooks/useLanguage';

export interface LogoutButtonProps {
  /** Callback when logout is clicked */
  onLogout: () => void;
  /** Optional custom label */
  label?: string;
}

export function LogoutButton({ onLogout, label }: LogoutButtonProps) {
  const { t } = useLanguage();
  const buttonLabel = label || t('logout') || 'Đăng xuất';

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={onLogout}
        variant="outline"
        className="flex items-center gap-3 px-6 py-3 bg-white shadow-lg hover:shadow-xl border-2 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-all font-medium"
      >
        <LogOut className="h-5 w-5" />
        <span>{buttonLabel}</span>
      </Button>
    </div>
  );
}
