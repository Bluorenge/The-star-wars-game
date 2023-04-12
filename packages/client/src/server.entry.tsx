import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { App } from 'core/App';
import { UserRepository, UserService } from 'api/UserService';
import { routes } from 'core/Router';
import { matchPath } from 'react-router-dom';
import { createStore } from 'app/store';

export const render = async (url: string, repository: UserRepository) => {
  const [pathname] = url.split('?');
  const store = createStore(new UserService(repository));
  const currentRoute = routes.find((route) =>
    matchPath(pathname, route.path as string)
  );

  if (currentRoute) {
    const { loader } = currentRoute;

    if (loader) {
      await loader(store.dispatch as any);
    }
  }

  const initialState = store.getState();

  const cache = createCache();

  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <StyleProvider cache={cache}>
            <App />
          </StyleProvider>
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  const styleText = extractStyle(cache);

  return [html, styleText, initialState];
};
