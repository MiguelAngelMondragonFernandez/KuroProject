import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, getContrastColor } from '../../utils/ThemeContext';
import { LanguageContext } from '../LanguageContext';

export const ThemeProvider = ({ children }) => {
  const { config, updateConfig } = useContext(LanguageContext);
  const [themeColor, setThemeColor] = useState(config.colorPricipal || "#2D2523");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const changeThemeColor = (newColor) => {
  
    const formattedColor = newColor.startsWith('#') ? newColor : `#${newColor}`;
    
    setThemeColor(formattedColor);
    updateConfig({ colorPricipal: formattedColor });
    
    const contrastColor = getContrastColor(formattedColor);
    setTextColor(contrastColor);
    
    document.documentElement.style.setProperty("--theme-color", formattedColor);
    document.documentElement.style.setProperty("--text-color", contrastColor);
  };

  useEffect(() => {
    if (config.colorPricipal) {
      changeThemeColor(config.colorPricipal);
    }  
  }, [config.colorPricipal]);

  
  const value = {
    themeColor,
    textColor,
    changeThemeColor,
    getContrastColor
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};