import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import yua from './locales/yua.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    yua: { translation: yua },
  },
  fallbackLng: 'es',
  lng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
