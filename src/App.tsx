import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { LoginPage } from './components/LoginPage';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { EnterpriseDashboard } from './components/enterprise/EnterpriseDashboard';
import { CollectorDashboard } from './components/collector/CollectorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import './i18n/config';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string; name: string; points: number } | null>(null);

  const pageFromHash = (hash: string): 'home' | 'login' => {
    const value = hash.replace('#', '').trim().toLowerCase();
    if (value === 'login') return 'login';
    return 'home';
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      if (parsed?.isLoggedIn && parsed?.currentUser) {
        setIsLoggedIn(true);
        setCurrentUser(parsed.currentUser);
      }
    }

    const initialHashPage = pageFromHash(window.location.hash);
    setCurrentPage(initialHashPage);

    const handleHashChange = () => {
      setCurrentPage(pageFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    const safePage = page === 'login' ? 'login' : 'home';
    setCurrentPage(safePage);
    window.location.hash = safePage;
  };

  const handleLogin = (username: string, role: string) => {
    setIsLoggedIn(true);
    
    const userData = {
      username,
      role,
      name: role === 'CITIZEN' ? 'Nguyễn Văn A' : 
            role === 'ENTERPRISE' ? 'Green Recycle Co.' :
            role === 'COLLECTOR' ? 'Nguyễn Văn B' :
            role === 'ADMIN' ? 'Admin User' :
            'Unknown User',
      points: 2350
    };
    
    setCurrentUser(userData);
    const roleKey = role.toLowerCase();
    const defaultSection =
      roleKey === 'citizen' ? 'dashboard' :
      roleKey === 'enterprise' ? 'dashboard' :
      roleKey === 'collector' ? 'overview' :
      roleKey === 'admin' ? 'overview' : 'dashboard';
    window.location.hash = `${roleKey}/${defaultSection}`;
    localStorage.setItem('authState', JSON.stringify({ isLoggedIn: true, currentUser: userData }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home');
    window.location.hash = 'home';
    localStorage.removeItem('authState');
  };

  // Show appropriate dashboard based on role
  if (isLoggedIn && currentUser) {
    if (currentUser.role === 'CITIZEN') {
      return (
        <CitizenDashboard
          userData={{ name: currentUser.name, points: currentUser.points }}
          onLogout={handleLogout}
        />
      );
    }
    
    if (currentUser.role === 'ENTERPRISE') {
      return (
        <EnterpriseDashboard
          companyData={{ name: currentUser.name }}
          onLogout={handleLogout}
        />
      );
    }
    
    if (currentUser.role === 'COLLECTOR') {
      return (
        <CollectorDashboard
          collectorData={{ name: currentUser.name }}
          onLogout={handleLogout}
        />
      );
    }
    
    if (currentUser.role === 'ADMIN') {
      return (
        <AdminDashboard
          adminData={{ name: currentUser.name }}
          onLogout={handleLogout}
        />
      );
    }
    
    // Other roles will show placeholder for now
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Dashboard for {currentUser.role}
          </h1>
          <p className="text-gray-600 mb-6">Coming soon...</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'login' && (
        <Header 
          isLoggedIn={isLoggedIn}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'home' && <Homepage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
    </div>
  );
}