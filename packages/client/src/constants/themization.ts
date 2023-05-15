import window from 'helpers/window';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

const isDark: MediaQueryList | null = window.matchMedia(
  '(prefers-color-scheme:dark)'
);
export const SYSTEM_THEME = isDark ? THEME_DARK : THEME_LIGHT;
