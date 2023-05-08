import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateColorTheme } from 'core/store/actions/colorThemeActions';
import { THEME_LIGHT, THEME_DARK } from 'constants/themization';

import './ThemeButton.scss';

export const ThemeButton = () => {
  const {
    colorTheme,
    user: { currentUser },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const checked = colorTheme === THEME_DARK;

  const themeSwitcher = async (inputEl: HTMLElement) => {
    inputEl.blur();
    const newTheme = colorTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;

    await dispatch(
      updateColorTheme({
        userId: currentUser?.id,
        theme: newTheme,
      })
    );
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        value={colorTheme}
        onChange={(e) => themeSwitcher(e.target as HTMLElement)}
        checked={checked}
      />
      <span className="slider"></span>
    </label>
  );
};
