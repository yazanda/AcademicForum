import React, { createContext, useState } from 'react';

// Import your language translation files
import en from '../translations/en.json';
import ar from '../translations/ar.json';

// Create the language context
export const LanguageContext = createContext();

// Define the language provider component
export const LanguageProvider = ({ children }) => {
  // Initial language state
  const [language, setLanguage] = useState('en'); // 'en' for English by default

  // Get the translation object based on the selected language
  const getTranslation = () => {
    switch (language) {
      case 'en':
        return en;
      case 'ar':
        return ar;
      // Add more cases for other supported languages
      default:
        return en; // Default to English if the selected language is not supported
    }
  };

  // Function to change the language
  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  // Context value
  const contextValue = {
    language,
    translation: getTranslation(),
    changeLanguage,
  };

  // Provide the context value to the children components
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
