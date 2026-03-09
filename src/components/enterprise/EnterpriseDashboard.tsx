import { useEffect, useState } from 'react';
import { Analytics } from './Analytics/Analytics';
import { CapacityManagement } from './CapacityManagement/CapacityManagement';
import { CollectionRequests } from './CollectionRequests/CollectionRequests';
import { RequestDetail } from './CollectionRequests/RequestDetail';
import { CollectorManagement } from './CollectorManagement/CollectorManagement';
import { DashboardOverview } from './DashboardOverview/DashboardOverview';
import { EnterpriseLayout } from './EnterpriseLayout';
import { PointRules } from './PointRules/PointRules';
import { Profile } from './Profile/Profile';

interface EnterpriseDashboardProps {
  companyData: {
    name: string;
  };
  onLogout: () => void;
}

export function EnterpriseDashboard({ companyData, onLogout }: EnterpriseDashboardProps) {
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [requestDetailData, setRequestDetailData] = useState<any>(null);
  const [justAssignedId, setJustAssignedId] = useState<string | null>(null);

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
      setJustAssignedId(null);
    }
    if (section === 'requests' && data?.justAssignedId) {
      setJustAssignedId(data.justAssignedId);
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={handleNavigate} />;
      case 'requests':
        return <CollectionRequests onNavigate={handleNavigate} justAssignedId={justAssignedId} />;
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