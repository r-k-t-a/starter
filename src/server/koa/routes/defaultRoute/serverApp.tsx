import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import { App } from '../../../../view/App';

interface Props {
  helmetContext: {};
  location: string;
  routerContext: StaticRouter['context'];
  store: Store;
}

export const serverApp = ({
  helmetContext,
  location,
  routerContext,
  store,
}: Props): JSX.Element => (
  <ReduxProvider store={store}>
    <HelmetProvider context={helmetContext}>
      <StaticRouter context={routerContext} location={location}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  </ReduxProvider>
);
