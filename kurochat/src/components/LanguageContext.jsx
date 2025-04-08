import React , {createContext, useState, useEffect} from 'react';
import {cargarIdiomas} from "../utils/languajeContext";

export const LanguageContext = createContext();

export function LanguageProvider({children}) {
    const defaultConfig = {
        colorPricipal: "#000000",
        tema: "light",
        idioma: "es",
        usuario: null,
        id: null,
    };
    const savedConfig = JSON.parse(localStorage.getItem('config')) || defaultConfig;    
    const [config, setConfig] = useState(savedConfig);
    const [translations, setTranslations] = useState(cargarIdiomas(savedConfig.idioma));

    const changeLanguage = (code) => {
        const updatedConfig = { ...config, idioma: code };
        setConfig(updatedConfig);
        setTranslations(cargarIdiomas(code));
        localStorage.setItem('config', JSON.stringify(updatedConfig));
    };

    const updateConfig = (newConfig) => {
        const updatedConfig = { ...config, ...newConfig };
        setConfig(updatedConfig);
        localStorage.setItem('config', JSON.stringify(updatedConfig));
    };


    useEffect(() => {
        setTranslations(cargarIdiomas(config.idioma));
    }, [config.idioma]);

    return (
        <LanguageContext.Provider value={{ config, translations, changeLanguage, updateConfig }}>
            {children}
        </LanguageContext.Provider>
    );
}