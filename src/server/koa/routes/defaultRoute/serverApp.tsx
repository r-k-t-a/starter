import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { App } from '../../../../view/App';

interface Props {
  helmetContext: {};
  location: string;
  routerContext: StaticRouter['context'];
}

export const serverApp = ({ helmetContext, location, routerContext }: Props): JSX.Element => (
  <HelmetProvider context={helmetContext}>
    <StaticRouter context={routerContext} location={location}>
      <App />
    </StaticRouter>
  </HelmetProvider>
);
