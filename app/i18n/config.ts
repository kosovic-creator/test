import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations - organizovano po jezicima i funkcionalnostima
import artikli_en from './locales/en/artikli.json';
import artikli_sr from './locales/sr/artikli.json';
import korisnici_en from './locales/en/korisnici.json';
import korisnici_sr from './locales/sr/korisnici.json';

// Jednostavna konfiguracija i18next-a
i18n
  .use(initReactI18next)
  .init({
    // Svi prevodi organizovani po jezicima
    resources: {
      en: {
        artikli: artikli_en,
        korisnici: korisnici_en,
      },
      sr: {
        artikli: artikli_sr,
        korisnici: korisnici_sr,
      },
    },

    // Srpski je glavni jezik
    lng: 'sr',
    fallbackLng: 'sr',

    // Glavni namespace za opšte prevode
    defaultNS: 'common',

    interpolation: {
      escapeValue: false // React već čuva od XSS napada
    }
  });

export default i18n;
