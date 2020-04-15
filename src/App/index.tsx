import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { App } from './App';

const RktaApp = (): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

const appNode = (): HTMLElement =>
  document.getElementById(process.env.CLIENT__APP_CONTAINER!) as HTMLElement;

document.addEventListener('readystatechange', (): void => {
  if (document.readyState !== 'complete') return;
  // const reduxState = document.getElementById(process.env.CLIENT__CACHE_CONTAINER!);
  hydrate(<RktaApp />, appNode());
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;
if (module.hot) {
  if (document.readyState === 'complete') render(<RktaApp />, appNode());
  module.hot.accept();
}
