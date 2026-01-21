import { useEffect, useState } from 'react';
import { CitizenLayout } from './CitizenLayout';
import { DashboardOverview } from './DashboardOverview/DashboardOverview';
import { CreateReport } from './CreateReport/CreateReport';
import { MyReports } from './MyReports/MyReports';
import { ReportDetail } from './MyReports/ReportDetail';
import { PointsRewards } from './PointsRewards/PointsRewards';
import { Leaderboard } from './Leaderboard/Leaderboard';
import { Feedback } from './Feedback/Feedback';
import { Profile } from './Profile/Profile';

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