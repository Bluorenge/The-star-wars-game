import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from 'core/App/App';
import { UserService } from './api/UserService';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { createStore } from 'app/store';

let initialState;

if ((window as any).initialState) {
  initialState = (window as any).initialState!;

  // delete (window as any).initialState!;
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider
      store={createStore(
        new UserService(new YandexAPIRepository()),
        initialState
      )}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
