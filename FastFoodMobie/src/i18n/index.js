import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as resources from './locales';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  // default language app
  detect: callback => callback('vi'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: resources.default,
    fallbackLng: 'vi',
    debug: true,
    ns: ['common'],
    defaultNS: 'common',
    compatibilityJSON: 'v3', // android issue
  });

export default i18next;
