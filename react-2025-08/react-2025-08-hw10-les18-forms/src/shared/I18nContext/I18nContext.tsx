//https://www.seeratawan.me/blog/react-internationalization-using-context-api/

import React, { createContext, useState, ReactNode } from 'react';
import { i18n, I18nContextType, Language } from './I18nContext.types';

// Create i18n context object
export const I18nContext = createContext<I18nContextType>({
    language: Language.RU,
    setLanguage: () => null,
    i18n: i18n
});

interface I18nProviderProps {
    children: ReactNode;
}

// Create Provider component
export const I18nProvider = ({ children }: I18nProviderProps) => {
    const [language, setLanguage] = useState<Language>(Language.EN);

    return (
        // Provide i18n context to all child components
        <I18nContext.Provider value={{ language, setLanguage, i18n }}>{children}</I18nContext.Provider>
    );
};
