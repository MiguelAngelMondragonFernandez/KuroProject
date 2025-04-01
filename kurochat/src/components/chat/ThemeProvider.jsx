import React, { useState, useEffect } from 'react';
import { ThemeContext, getContrastColor } from '../../utils/ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "#2D2523");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const changeThemeColor = (newColor) => {
  
    const formattedColor = newColor.startsWith('#') ? newColor : `#${newColor}`;
    
    setThemeColor(formattedColor);
    localStorage.setItem("themeColor", formattedColor);
    
    const contrastColor = getContrastColor(formattedColor);
    setTextColor(contrastColor);
    
    document.documentElement.style.setProperty("--theme-color", formattedColor);
    document.documentElement.style.setProperty("--text-color", contrastColor);
  };

  useEffect(() => {
    changeThemeColor(themeColor);
  }, []);

  
  const value = {
    themeColor,
    textColor,
    changeThemeColor,
    getContrastColor
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};