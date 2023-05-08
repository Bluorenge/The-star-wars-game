import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';

import { App } from 'core/App';
import { UserRepository, UserService } from 'api/UserService';
import { createStore } from 'core/store/store';
import { getCurrentUser } from 'core/store/actions/userActions';
import { ROUTES } from 'constants/routes';
import { THEME_DARK } from 'constants/themization';

export const render = async (url: string, repository: UserRepository) => {
  const store = createStore(new UserService(repository));
  await store.dispatch(getCurrentUser());

  const initialState = store.getState();

  const antdColorTheme =
    initialState.colorTheme === THEME_DARK
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm;

  const [pathname] = url.split('?');
  const isAuthPage = [ROUTES.LOGIN_PAGE, ROUTES.REGISTER_PAGE_PATH].includes(
    pathname
  );
  const isAuth = initialState.user.isAuth;

  let redirectUrl = null;

  if (isAuth && isAuthPage) {
    redirectUrl = ROUTES.MAIN_PAGE_PATH;
  } else if (!isAuth && !isAuthPage) {
    redirectUrl = ROUTES.LOGIN_PAGE;
  }

  const cache = createCache();

  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={redirectUrl ?? url}>
          <StyleProvider cache={cache}>
            <ConfigProvider
              theme={{
                algorithm: antdColorTheme,
              }}
            >
              <App />
            </ConfigProvider>
          </StyleProvider>
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  const styleText = extractStyle(cache); // собираем инлайн-стили antd

  return [html, styleText, initialState, redirectUrl];
};
