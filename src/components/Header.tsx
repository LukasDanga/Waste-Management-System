import { Recycle } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isLoggedIn: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ isLoggedIn, currentPage, onNavigate }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
            <Recycle className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-lg">{t('common.appName')}</span>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-green-600 ${
              currentPage === 'home' ? 'text-green-600' : 'text-foreground'
            }`}
          >
            {t('nav.home')}
          </button>
          <button className="transition-colors hover:text-green-600 text-foreground">
            {t('common.info')}
          </button>
          <button className="transition-colors hover:text-green-600 text-foreground">
            {t('homepage.features.title')}
          </button>
          <button className="transition-colors hover:text-green-600 text-foreground">
            {t('common.details')}
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Login Button */}
          {!isLoggedIn && (
            <Button 
              onClick={() => onNavigate('login')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {t('auth.login')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}