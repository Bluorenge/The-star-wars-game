import { useEffect, useState } from 'react';

import window from 'helpers/window';
import { LOCAL_STORAGE_APP_THEME } from 'constants/localStorage';
import { THEME_LIGHT, THEME_DARK } from 'constants/themization';

export const useTheme = () => {
  const isDark: MediaQueryList | null = window?.matchMedia(
    '(prefers-color-scheme:dark)'
  );
  const defaultTheme: string = isDark?.matches ? THEME_DARK : THEME_LIGHT;

  const [theme, setTheme] = useState(
    window.localStorage.getItem(LOCAL_STORAGE_APP_THEME) || defaultTheme
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(LOCAL_STORAGE_APP_THEME, theme);
  }, [theme]);

  return [theme, setTheme] as const;
};
