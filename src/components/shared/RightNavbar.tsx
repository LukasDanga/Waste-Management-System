import { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';

export interface NavMenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Display label */
  label: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional badge count */
  badge?: number;
}

export interface RightNavbarProps {
  /** Array of navigation menu items */
  menuItems: NavMenuItem[];
  /** Currently active menu item ID */
  activeItemId: string;
  /** Callback when menu item is clicked */
  onNavigate: (itemId: string) => void;
  /** Primary brand color for active state (e.g., 'green', 'blue', 'purple') */
  brandColor?: 'green' | 'blue' | 'purple' | 'orange';
  /** Whether the navbar is open (for mobile) */
  isOpen?: boolean;
  /** Callback to close navbar (for mobile) */
  onClose?: () => void;
}

const colorClasses = {
  green: {
    active: 'bg-green-50 text-green-600',
  },
  blue: {
    active: 'bg-blue-50 text-blue-600',
  },
  purple: {
    active: 'bg-purple-50 text-purple-600',
  },
  orange: {
    active: 'bg-orange-50 text-orange-600',
  },
};

export function RightNavbar({
  menuItems,
  activeItemId,
  onNavigate,
  brandColor = 'green',
  isOpen = false,
  onClose,
}: RightNavbarProps) {
  const colors = colorClasses[brandColor];

  // Navigation Menu Content
  const NavbarContent = () => (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItemId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              if (isOpen && onClose) {
                onClose();
              }
            }}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? `${colors.active} font-medium`
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop - Fixed Left Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-30 overflow-y-auto">
        <NavbarContent />
      </aside>

      {/* Mobile - Overlay Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col shadow-2xl">
            {/* Mobile Header with Close Button */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-end">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Navigation Content */}
            <NavbarContent />
          </aside>
        </div>
      )}
    </>
  );
}