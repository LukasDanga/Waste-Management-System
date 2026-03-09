import { useEffect, useState } from 'react';
import { CollectorLayout } from './CollectorLayout';
import { DashboardOverview } from './DashboardOverview/DashboardOverview';
import { MyTasks } from './MyTasks/MyTasks';
import { TaskDetail } from './MyTasks/TaskDetail';
import { WorkHistory } from './WorkHistory/WorkHistory';
import { PersonalStats } from './PersonalStats/PersonalStats';
import { Profile } from './Profile/Profile';

interface CollectorDashboardProps {
  collectorData: {
    name: string;
  };
  onLogout: () => void;
}

export function CollectorDashboard({ collectorData, onLogout }: CollectorDashboardProps) {
  const [activePage, setActivePage] = useState('overview');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('collector/')) {
      const page = hash.split('/')[1];
      if (page) setActivePage(page);
    }
  }, []);

  const handleNavigate = (page: string, taskId?: string) => {
    setActivePage(page);
    window.location.hash = `collector/${page}`;
    if (taskId) {
      setSelectedTaskId(taskId);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return <DashboardOverview onNavigate={handleNavigate} />;
      case 'tasks':
        return <MyTasks onNavigate={handleNavigate} />;
      case 'task-detail':
        return <TaskDetail taskId={selectedTaskId || '1'} onNavigate={handleNavigate} />;
      case 'history':
        return <WorkHistory onNavigate={handleNavigate} />;
      case 'stats':
        return <PersonalStats />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <CollectorLayout
      activePage={activePage}
      onNavigate={handleNavigate}
      collectorName={collectorData.name}
      onLogout={onLogout}
    >
      {renderContent()}
    </CollectorLayout>
  );
}