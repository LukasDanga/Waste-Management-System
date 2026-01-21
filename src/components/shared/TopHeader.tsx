import { ReactNode } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../hooks/useLanguage';

export interface TopHeaderProps {
  /** Logo/Brand component or text */
  logo?: ReactNode;
  /** User/Company name to display */
  displayName: string;
  /** First letter for avatar fallback */
  avatarLetter: string;
  /** Avatar background color class (e.g., 'bg-green-600') */
  avatarColor: string;
  /** Role subtitle (e.g., 'Người dân', 'Quản trị viên') */
  roleSubtitle?: string;
  /** Additional header content (e.g., points badge) */
  additionalContent?: ReactNode;
  /** Notification count */
  notificationCount?: number;
  /** Callback for mobile menu toggle */
  onMobileMenuToggle?: () => void;
  /** Whether to show mobile menu button */
  showMobileMenu?: boolean;
}

export function TopHeader({
  logo,
  displayName,
  avatarLetter,
  avatarColor,
  roleSubtitle,
  additionalContent,
  notificationCount = 0,
  onMobileMenuToggle,
  showMobileMenu = true,
}: TopHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          {showMobileMenu && onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          )}

          {/* Logo/Brand */}
          {logo && (
            <div className="flex items-center gap-3">
              {logo}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Additional Content (e.g., Points Badge) */}
          {additionalContent}

          {/* Notifications */}
          <button 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t('notifications') || 'Notifications'}
          >
            <Bell className="h-5 w-5 text-gray-700" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className={`${avatarColor} text-white`}>
                {avatarLetter}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="font-medium text-sm text-gray-900">{displayName}</p>
              {roleSubtitle && (
                <p className="text-xs text-gray-500">{roleSubtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
