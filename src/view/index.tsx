import React, { FC } from 'react';
import { hydrate, render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { createStore } from '../reducer';
import { App } from './App';

interface Props {
  store: any;
}

const RktaApp: FC<Props> = ({ store }): JSX.Element => (
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

document.addEventListener('readystatechange', (): void => {
  if (document.readyState !== 'complete') return;
  const bundleNode = document.getElementById(process.env.CLIENT__CACHE_CONTAINER!)!;
  const reduxState = JSON.parse(bundleNode.innerHTML);
  const store = createStore(
    {
      token: process.env.CLIENT__LOGUX_DEFAULT_TOKEN!,
      userId: process.env.CLIENT__LOGUX_DEFAULT_USER!,
    },
    reduxState,
  );
  store.client.start();
  store.client.log.on('add', (action, meta) => console.log('add', action, meta));
  hydrate(<RktaApp store={store} />, appNode());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (module.hot) {
    if (document.readyState === 'complete') render(<RktaApp store={store} />, appNode());
    module.hot.accept();
  }
});
