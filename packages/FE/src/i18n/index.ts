import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import config from "@/config";
import { languages } from "@/types/user";

import caLocales from "./locales/ca.json";
import enLocales from "./locales/en.json";
import esLocales from "./locales/es.json";
import frLocales from "./locales/fr.json";

const resources = {
  en: { translation: enLocales },
  es: { translation: esLocales },
  ca: { translation: caLocales },
  fr: { translation: frLocales },
};

const suportedLanguages = [...languages];

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: config.isDevEnvironment(),
  resources,
  supportedLngs: suportedLanguages,
  fallbackLng: "en",
});

export default i18n;
