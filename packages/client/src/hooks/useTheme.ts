import { LOCAL_STORAGE_APP_THEME } from './../constants/localStorage';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const isDark: MediaQueryList = window?.matchMedia(
    '(prefers-color-scheme:dark)'
  );
  const defaultTheme: string = isDark.matches ? 'dark' : 'light';
  const [theme, setTheme] = useState(
    localStorage.getItem(LOCAL_STORAGE_APP_THEME) || defaultTheme
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LOCAL_STORAGE_APP_THEME, theme);
  }, [theme]);

  return [theme, setTheme] as const;
};
