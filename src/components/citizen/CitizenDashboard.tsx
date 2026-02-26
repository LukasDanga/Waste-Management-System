import { useEffect, useState } from 'react';
import { CitizenLayout } from './CitizenLayout';
import { DashboardOverview } from './DashboardOverview/DashboardOverview';
import { CreateReport } from './CreateReport/CreateReport';
import { MyReports } from './MyReports/MyReports';
import { PointsRewards } from './PointsRewards/PointsRewards';
import { Leaderboard } from './Leaderboard/Leaderboard';
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

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('citizen/')) {
      const section = hash.split('/')[1];
      if (section) setCurrentSection(section);
    }
  }, []);

  const handleNavigate = (section: string) => {
    // No detail view now; redirect any detail intent back to list
    const nextSection = section === 'report-detail' ? 'my-reports' : section;
    setCurrentSection(nextSection);
    window.location.hash = `citizen/${nextSection}`;
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={handleNavigate} />;
      case 'create-report':
        return <CreateReport onNavigate={handleNavigate} />;
      case 'my-reports':
        return <MyReports onNavigate={handleNavigate} />;
      case 'points':
        return <PointsRewards />;
      case 'leaderboard':
        return <Leaderboard />;
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