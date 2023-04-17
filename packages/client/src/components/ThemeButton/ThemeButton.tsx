import './ThemeButton.scss';
import { useTheme } from 'hooks/useTheme';

export const ThemeButton = () => {
  const [theme, setTheme] = useTheme();

  const checked = theme === 'dark' ? true : undefined;

  const themeSwitcher = (e: any) => {
    e.blur();
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
        value="light"
        onClick={(e) => themeSwitcher(e.target)}
        checked={checked}
      />
      <span className="slider"></span>
    </label>
  );
};
