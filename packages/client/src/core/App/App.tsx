import { useRoutes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { routes } from 'core/Router';
import { useLocale } from 'hooks/useLocale';
import { en, ru } from 'translations';

import './App.scss';

export const App = () => {
  const [locale] = useLocale();
  const router = useRoutes(routes);

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
