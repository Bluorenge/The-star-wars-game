import { IntlProvider } from 'react-intl';
import { useRoutes } from 'react-router-dom';

import { routes } from 'core/Router';
import { useLocale } from 'hooks/useLocale';
import { en, ru } from 'translations';

import './App.scss';
import { store } from 'app/store';
import { Provider } from 'react-redux';

function Main() {
  const [locale] = useLocale();
  const routing = useRoutes(routes);

  return (
    <IntlProvider
      locale={locale}
      messages={locale === 'en' ? en : ru}
      defaultLocale="en"
    >
      {routing}
    </IntlProvider>
  );
}

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
