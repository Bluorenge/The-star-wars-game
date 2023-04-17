import './ThemeButton.scss';
import { useTheme } from 'hooks/useTheme';

export const ThemeButton = () => {
  const [theme, setTheme] = useTheme();

  const checked = theme === 'dark' ? true : undefined;

  const themeSwitcher = (inputEl: HTMLElement) => {
    inputEl.blur();
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <label className="switch">
      <input
        type="checkbox"
        value={theme}
        onClick={(e) => themeSwitcher(e.target as HTMLElement)}
        checked={checked}
      />
      <span className="slider"></span>
    </label>
  );
};
