import React from "react";

// eslint-disable-next-line import/prefer-default-export
export const LanguageContext = React.createContext({
  selectedLanguage: { value: "", label: "" },
  setSelectedLanguage: (language) => {
    return language;
  },
  languageOptions: [],
});
