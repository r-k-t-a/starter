import React from 'react';
import { StaticRouter } from 'react-router-dom';

import { App } from '../../../App/App';

export const serverApp = (context: StaticRouter['context'], location: string): JSX.Element => (
  <StaticRouter context={context} location={location}>
    <App />
  </StaticRouter>
);
