import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { DashboardOverview } from './DashboardOverview/DashboardOverview';
import { UserManagement } from './UserManagement/UserManagement';
import { EnterpriseManagement } from './EnterpriseManagement/EnterpriseManagement';
import { ReportMonitoring } from './ReportMonitoring/ReportMonitoring';
import { Disputes } from './Disputes/Disputes';
import { Permissions } from './Permissions/Permissions';
import { ComprehensiveReports } from './ComprehensiveReports/ComprehensiveReports';
import { Profile } from './Profile/Profile';

interface AdminDashboardProps {
  adminData: {
    name: string;
  };
  onLogout: () => void;
}

export function AdminDashboard({ adminData, onLogout }: AdminDashboardProps) {
  const [activePage, setActivePage] = useState('overview');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('admin/')) {
      const page = hash.split('/')[1];
      setActivePage(page || 'overview');
    }
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.location.hash = `admin/${page}`;
  };

  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'enterprises':
        return <EnterpriseManagement />;
      case 'reports':
        return <ReportMonitoring />;
      case 'disputes':
        return <Disputes />;
      case 'permissions':
        return <Permissions />;
      case 'comprehensive':
        return <ComprehensiveReports />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout
      activePage={activePage}
      onNavigate={handleNavigate}
      adminName={adminData.name}
      onLogout={onLogout}
    >
      {renderContent()}
    </AdminLayout>
  );
}