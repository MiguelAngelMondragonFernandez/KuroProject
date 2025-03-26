import React , {createContext, useState, useEffect} from 'react';
import {cargarIdiomas, guardarIdioma} from "../utils/languajeContext";

export const LanguageContext = createContext();

export function LanguageProvider({children}) {
    const savedLanguageCode = localStorage.getItem('idioma') || 'es';
    const [language, setLanguage] = useState(savedLanguageCode);
    const [translations, setTranslations] = useState(cargarIdiomas(savedLanguageCode));

    const changeLanguage = (code) => {
        setLanguage(code);
        setTranslations(cargarIdiomas(code));
        guardarIdioma(code);
    };

    useEffect(() => {
        setTranslations(cargarIdiomas(language));
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}