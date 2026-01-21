/**
 * EcoWaste - Language Switcher Component
 * Toggle between Vietnamese and English
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer ${i18n.language === lang.code ? 'bg-accent' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
            {i18n.language === lang.code && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Alternative: Simple Toggle Button Version
export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      title={i18n.language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">
        {i18n.language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
      </span>
      <span className="sm:hidden">
        {i18n.language === 'vi' ? '🇻🇳' : '🇬🇧'}
      </span>
    </Button>
  );
};
