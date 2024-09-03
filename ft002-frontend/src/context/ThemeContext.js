import React, { createContext, useContext } from 'react';
import tenantThemes from '../themes/tenantThemes'; // Adjust the import path as needed

const ThemeContext = createContext();

export const ThemeProvider = ({ children, tenant }) => {
  const theme = tenantThemes[tenant] || tenantThemes.default;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
