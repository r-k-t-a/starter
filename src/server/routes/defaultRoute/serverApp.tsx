import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { HelmetProvider } from 'react-helmet-async';

import { App } from '../../../App/App';
import { Client } from '../../../apollo';

interface Props {
  apolloClient: Client;
  helmetContext: {};
  location: string;
  routerContext: StaticRouter['context'];
}

export const serverApp = ({
  apolloClient,
  helmetContext,
  location,
  routerContext,
}: Props): JSX.Element => (
  <ApolloProvider client={apolloClient}>
    <HelmetProvider context={helmetContext}>
      <StaticRouter context={routerContext} location={location}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  </ApolloProvider>
);
