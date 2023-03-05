import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { GlobalOutlined } from '@ant-design/icons';
import { getCurrentUser } from 'app/slices/userSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { Router } from 'core/Router';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useLocale } from 'hooks/useLocale';
import { en, ru } from 'translations';

import './App.scss';

import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const [locale, toggleLocale] = useLocale();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY)) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <div className="App">
      <IntlProvider
        locale={locale}
        messages={locale === 'en' ? en : ru}
        defaultLocale="en"
      >
        {/* временное решение до внедрения navbar */}
        <GlobalOutlined
          className="locIcon"
          onClick={() => {
            toggleLocale();
          }}
        />
        <Router />
      </IntlProvider>
    </div>
  );
};
