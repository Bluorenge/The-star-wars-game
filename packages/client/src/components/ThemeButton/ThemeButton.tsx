import './ThemeButton.scss';
import { useTheme } from 'hooks/useTheme';
import { THEME_LIGHT, THEME_DARK } from 'constants/themization';

export const ThemeButton = () => {
  const [theme, setTheme] = useTheme();

  const checked = theme === THEME_DARK ? true : undefined;

  const themeSwitcher = (inputEl: HTMLElement) => {
    inputEl.blur();
    if (theme === THEME_LIGHT) {
      setTheme(THEME_DARK);
    } else {
      setTheme(THEME_LIGHT);
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
