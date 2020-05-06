import { jsx } from '@emotion/core';
import { hydrate, render, FunctionComponent } from 'preact';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { createLoguxCreator, LoguxReduxStore } from '@logux/redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, PUSH_ERROR, ErrorPushAction } from 'reducers';
import { App } from './App';
import { version } from '../package.json';

const isProduction = process.env.NODE_ENV === 'production';
interface Props {
  store: LoguxReduxStore;
}

let enhacedStore: LoguxReduxStore;

const RktaApp: FunctionComponent<Props> = ({ store }): JSX.Element => (
  <ReduxProvider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ReduxProvider>
);

const appNode = (): HTMLElement =>
  document.getElementById(process.env.CLIENT__APP_CONTAINER!) as HTMLElement;

const initializeStore = (): LoguxReduxStore => {
  if (enhacedStore) return enhacedStore;
  const bundleNode = document.getElementById(process.env.CLIENT__CACHE_CONTAINER!)!;
  const preloadedState = JSON.parse(bundleNode.innerHTML);
  const createStore = createLoguxCreator({
    server: process.env.CLIENT__LOGUX_URL!,
    subprotocol: version,
    token: process.env.CLIENT__LOGUX_DEFAULT_TOKEN!,
    userId: process.env.CLIENT__LOGUX_DEFAULT_USER!,
  });
  const store = createStore(rootReducer, preloadedState, composeWithDevTools());
  store.client.start();
  store.client.node.catch(({ description: name, message, type }) => {
    if (!type) return;
    const action: ErrorPushAction = {
      type: PUSH_ERROR,
      payload: { type, message, name },
    };
    store.dispatch(action);
  });
  enhacedStore = store;
  return store;
};

document.addEventListener('readystatechange', (): void => {
  if (document.readyState !== 'complete') return;
  hydrate(<RktaApp store={initializeStore()} />, appNode());
});

if (isProduction && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.CLIENT__HTTP_BASE!}sw.js`);
  });
}

if (module.hot) {
  if (document.readyState === 'complete') render(<RktaApp store={initializeStore()} />, appNode());
  module.hot.accept();
  // eslint-disable-next-line global-require
  require('preact/devtools');
}
