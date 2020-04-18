import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/core';

import { App } from '../../../../view/App';

interface Props {
  emotionCache: EmotionCache;
  helmetContext: {};
  location: string;
  routerContext: StaticRouter['context'];
  reduxStore: Store;
}

export const serverApp = ({
  emotionCache,
  helmetContext,
  location,
  routerContext,
  reduxStore,
}: Props): JSX.Element => (
  <ReduxProvider store={reduxStore}>
    <HelmetProvider context={helmetContext}>
      <StaticRouter context={routerContext} location={location}>
        <CacheProvider value={emotionCache}>
          <App />
        </CacheProvider>
      </StaticRouter>
    </HelmetProvider>
  </ReduxProvider>
);
