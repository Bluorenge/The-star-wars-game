import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { routes } from 'core/Router';
import { getCurrentUser } from 'app/slices/userSlice';
import { useLocale } from 'hooks/useLocale';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { en, ru } from 'translations';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import window from 'helpers/window';

import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const [locale] = useLocale();
  const router = useRoutes(routes);

  useEffect(() => {
    if (window.localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY) === 'true') {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <IntlProvider
      locale={locale}
      messages={locale === 'en' ? en : ru}
      defaultLocale="en"
    >
      {router}
    </IntlProvider>
  );
};
