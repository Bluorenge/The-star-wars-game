import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { App } from 'core/App';
import { store } from 'app/store';

export const render = (url: string) => {
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

  return [html, styleText];
};
