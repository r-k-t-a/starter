import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { App } from './App';

const RktaApp = (): JSX.Element => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

document.onreadystatechange = (): void => {
  if (document.readyState !== 'complete') return;
  const appNode = document.getElementById(process.env.CLIENT__APP_CONTAINER!);
  // const reduxState = document.getElementById(process.env.CLIENT__CACHE_CONTAINER!);
  hydrate(
    <HelmetProvider>
      <RktaApp />
    </HelmetProvider>,
    appNode,
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;
if (module.hot) module.hot.accept('./');
