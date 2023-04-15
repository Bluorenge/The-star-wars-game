import './ThemeButton.scss';
import { useTheme } from 'hooks/useTheme';

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const themeSwitcher = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <input
      id="btnTheme"
      type="button"
      value="Изменить тему"
      onClick={themeSwitcher}
    />
  );
};
