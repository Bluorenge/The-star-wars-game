import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from 'core/App/App';
import { UserService } from './api/UserService';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { createStore } from 'app/store';
import { getCurrentUser } from 'app/slices/userSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';

async function renderApp() {
  if (window.initialState) {
    const store = createStore(
      new UserService(new YandexAPIRepository()),
      window.initialState
    );
    delete window.initialState;

    ReactDOM.hydrateRoot(
      document.getElementById('root') as HTMLElement,
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  } else {
    const store = createStore(new UserService(new YandexAPIRepository()));

    if (window.localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY)) {
      await store.dispatch(getCurrentUser());
    }

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }
}

renderApp();
