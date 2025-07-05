import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // تحميل ملفات الترجمة من مجلد public/locales
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,

    backend: {
      // لضبط المسار صح مع GitHub Pages أو أي مجلد فرعي
      loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/translation.json',
    },

    interpolation: {
      escapeValue: false, // مش مطلوب لـ React
    },
  });

export default i18n;
