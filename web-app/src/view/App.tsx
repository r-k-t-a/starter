/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { Helmet } from 'react-helmet-async';
import { Provider as UiProvider } from '@rkta/ui';
import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';

export const App = (): JSX.Element => {
  return (
    <div>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <UiProvider>
        <Global
          styles={({ color, Text }): {} => css`
          body {
            ${Text.body}
            ${Text.sans}
            background-color: ${color.paper};
            margin: 0;
            overscroll-behavior: none;
          }
        `}
        />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </UiProvider>
    </div>
  );
};
