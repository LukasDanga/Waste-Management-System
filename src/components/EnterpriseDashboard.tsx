import { useEffect, useState } from 'react';
import { EnterpriseLayout } from './enterprise/EnterpriseLayout';
import { DashboardOverview } from './enterprise/DashboardOverview';
import { CollectionRequests } from './enterprise/CollectionRequests';
import { RequestDetail } from './enterprise/RequestDetail';
import { CollectorManagement } from './enterprise/CollectorManagement';
import { CapacityManagement } from './enterprise/CapacityManagement';
import { Analytics } from './enterprise/Analytics';
import { PointRules } from './enterprise/PointRules';
import { Profile } from './enterprise/Profile';

interface EnterpriseDashboardProps {
  companyData: {
    name: string;
  };
  onLogout: () => void;
}

export function EnterpriseDashboard({ companyData, onLogout }: EnterpriseDashboardProps) {
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [requestDetailData, setRequestDetailData] = useState<any>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('enterprise/')) {
      const section = hash.split('/')[1];
      if (section) setCurrentSection(section);
    }
  }, []);

  const handleNavigate = (section: string, data?: any) => {
    setCurrentSection(section);
    window.location.hash = `enterprise/${section}`;
    if (section === 'request-detail' && data) {
      setRequestDetailData(data);
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={handleNavigate} />;
      case 'requests':
        return <CollectionRequests onNavigate={handleNavigate} />;
      case 'request-detail':
        return <RequestDetail onNavigate={handleNavigate} requestData={requestDetailData} />;
      case 'collectors':
        return <CollectorManagement />;
      case 'capacity':
        return <CapacityManagement />;
      case 'analytics':
        return <Analytics />;
      case 'point-rules':
        return <PointRules />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <EnterpriseLayout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      companyData={companyData}
      onLogout={onLogout}
    >
      {renderContent()}
    </EnterpriseLayout>
  );
}