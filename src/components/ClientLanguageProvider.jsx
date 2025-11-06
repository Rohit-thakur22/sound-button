"use client";

import { useEffect } from "react";
import i18n from "@/app/i18n"; // Ensure the path is correct for your project

const ClientLanguageProvider = ({ children, locale }) => {
  useEffect(() => {
    // Only update if the locale is different and we're not in the middle of a language change
    if (locale && i18n.language !== locale) {
      console.log('ClientLanguageProvider - updating language to:', locale);
      i18n.changeLanguage(locale);
      // Also update localStorage for consistency
      localStorage.setItem('language', locale);
    }
  }, [locale]);

  return <>{children}</>;
};

export default ClientLanguageProvider;
