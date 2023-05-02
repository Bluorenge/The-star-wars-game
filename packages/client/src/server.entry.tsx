import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { App } from 'core/App';
import { UserRepository, UserService } from 'api/UserService';
import { createStore } from 'app/store';
import { getCurrentUser } from 'app/actions/userActions';

export const render = async (url: string, repository: UserRepository) => {
  const store = createStore(new UserService(repository));

  await store.dispatch(getCurrentUser());

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

  const styleText = extractStyle(cache); // собираем инлайн-стили antd

  return [html, styleText, initialState];
};
