import { useRoutes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ConfigProvider, theme } from 'antd';

import { routes } from 'core/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { useLocale } from 'hooks/useLocale';
import { THEME_DARK } from 'constants/themization';
import { en, ru } from 'translations';

import './App.scss';

export const App = () => {
  const [locale] = useLocale();
  const router = useRoutes(routes);

  const { colorTheme } = useAppSelector((state) => state);
  const antdColorTheme =
    colorTheme === THEME_DARK ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <IntlProvider
      locale={locale}
      messages={locale === 'en' ? en : ru}
      defaultLocale="en"
    >
      <ConfigProvider
        theme={{
          algorithm: antdColorTheme,
        }}
      >
        {router}
      </ConfigProvider>
    </IntlProvider>
  );
};
