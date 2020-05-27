import { Suspense } from 'react';
import { jsx, css, Global } from '@emotion/core';
import { Helmet } from 'react-helmet-async';
import { Provider as UiProvider } from '@rkta/ui';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'src/react/pages/ErrorBoundary';

import Home from 'src/react/pages/Home';
import NotFound from 'src/react/pages/NotFound';
import LoguxDemo from 'src/react/pages/LoguxDemo';
import AppShell from 'src/react/pages/AppShell';

// const Home = lazy(() => import('pages/Home'));
// const NotFound = lazy(() => import('pages/NotFound'));
// const LoguxDemo = lazy(() => import('pages/LoguxDemo'));

export const App = (): JSX.Element => {
  // TODO: use Fragment after https://github.com/preactjs/preact/issues/2504 is fixed
  return (
    <div>
      <UiProvider>
        <ErrorBoundary>
          <Helmet>
            <title>Hello World</title>
          </Helmet>
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
          <Suspense fallback={null}>
            <Switch>
              <Route path="/app-shell" exact>
                <AppShell />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/logux-demo" exact>
                <LoguxDemo />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </UiProvider>
    </div>
  );
};
