import { ReactNode, useState } from 'react';
import { TopHeader, TopHeaderProps } from './TopHeader';
import { RightNavbar, RightNavbarProps } from './RightNavbar';
import { LogoutButton } from './LogoutButton';

export interface DashboardLayoutProps {
  /** Main content to be rendered */
  children: ReactNode;
  /** Props for the top header */
  headerProps: TopHeaderProps;
  /** Props for the right navbar */
  navbarProps: RightNavbarProps;
  /** Callback for logout action */
  onLogout: () => void;
  /** Optional custom logout button label */
  logoutLabel?: string;
}

/**
 * Unified Dashboard Layout Component
 * 
 * Combines TopHeader, RightNavbar, and LogoutButton into a cohesive layout.
 * Designed to be reusable across all user roles (Citizen, Enterprise, Collector, Admin).
 * 
 * Features:
 * - Fixed top header with user info and notifications
 * - Fixed left sidebar navigation with role-specific menu items
 * - Fixed bottom-left logout button
 * - Responsive design with mobile-friendly overlays
 * - Consistent spacing and design language
 */
export function DashboardLayout({
  children,
  headerProps,
  navbarProps,
  onLogout,
  logoutLabel,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <TopHeader
        {...headerProps}
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
        showMobileMenu={true}
      />

      {/* Left Navbar */}
      <RightNavbar
        {...navbarProps}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        {children}
      </main>

      {/* Fixed Bottom-Left Logout Button */}
      <LogoutButton 
        onLogout={onLogout}
        label={logoutLabel}
      />
    </div>
  );
}