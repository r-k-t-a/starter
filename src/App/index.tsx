import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { HelmetProvider } from 'react-helmet-async';

import { App } from './App';
import { init } from '../apollo';

const RktaApp = (): JSX.Element => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

document.onreadystatechange = (): void => {
  if (document.readyState !== 'complete') return;
  const appNode = document.getElementById(process.env.CLIENT__APP_CONTAINER!);
  const cacheNode = document.getElementById(process.env.CLIENT__CACHE_CONTAINER!);
  const apolloCache = JSON.parse(cacheNode!.innerHTML);
  const apolloClient = init(apolloCache);
  hydrate(
    <ApolloProvider client={apolloClient}>
      <HelmetProvider>
        <RktaApp />
      </HelmetProvider>
    </ApolloProvider>,
    appNode,
  );
};

if (module.hot) module.hot.accept();
