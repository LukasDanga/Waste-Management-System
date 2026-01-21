import { useEffect, useState } from 'react';
import { CitizenLayout } from './citizen/CitizenLayout';
import { DashboardOverview } from './citizen/DashboardOverview';
import { CreateReport } from './citizen/CreateReport';
import { MyReports } from './citizen/MyReports';
import { ReportDetail } from './citizen/ReportDetail';
import { PointsRewards } from './citizen/PointsRewards';
import { Leaderboard } from './citizen/Leaderboard';
import { Feedback } from './citizen/Feedback';
import { Profile } from './citizen/Profile';

interface CitizenDashboardProps {
  userData: {
    name: string;
    points: number;
  };
  onLogout: () => void;
}

export function CitizenDashboard({ userData, onLogout }: CitizenDashboardProps) {
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [reportDetailData, setReportDetailData] = useState<any>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('citizen/')) {
      const section = hash.split('/')[1];
      if (section) setCurrentSection(section);
    }
  }, []);

  const handleNavigate = (section: string, data?: any) => {
    setCurrentSection(section);
    window.location.hash = `citizen/${section}`;
    if (section === 'report-detail' && data) {
      setReportDetailData(data);
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={handleNavigate} />;
      case 'create-report':
        return <CreateReport onNavigate={handleNavigate} />;
      case 'my-reports':
        return <MyReports onNavigate={handleNavigate} />;
      case 'report-detail':
        return <ReportDetail onNavigate={handleNavigate} reportData={reportDetailData} />;
      case 'points':
        return <PointsRewards />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'feedback':
        return <Feedback />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <CitizenLayout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      userData={userData}
      onLogout={onLogout}
    >
      {renderContent()}
    </CitizenLayout>
  );
}