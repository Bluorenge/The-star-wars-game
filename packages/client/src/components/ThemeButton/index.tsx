import './ThemeButton.scss';
import { useTheme } from 'hooks/useTheme';

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const themeSwitcher = () => {
    console.log('hello');
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <input
      id="theme__button"
      type="button"
      value="Изменить тему"
      onClick={themeSwitcher}
    />
  );
};
