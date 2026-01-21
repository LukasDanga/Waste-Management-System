/**
 * EcoWaste - i18n Configuration
 * Internationalization setup using i18next
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { vi } from './locales/vi';
import { en } from './locales/en';
import { STORAGE_KEYS } from '../constants';

// Get saved language from localStorage or default to Vietnamese
const savedLanguage = typeof window !== 'undefined' 
  ? localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'vi'
  : 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en },
    },
    lng: savedLanguage,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lng);
  }
});

export default i18n;
