/**
 * EcoWaste - useLanguage Hook
 * Custom hook for language management
 */

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;
  const isVietnamese = currentLanguage === 'vi';
  const isEnglish = currentLanguage === 'en';

  const changeLanguage = useCallback(
    (lang: 'vi' | 'en') => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  }, [currentLanguage, i18n]);

  return {
    t,
    currentLanguage,
    isVietnamese,
    isEnglish,
    changeLanguage,
    toggleLanguage,
  };
};
