/* eslint-disable global-require, @typescript-eslint/no-var-requires, no-underscore-dangle, @typescript-eslint/camelcase */
import { h } from 'preact';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __non_webpack_require__: any;
const directRequire = __non_webpack_require__;

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
}: Props): JSX.Element => {
  const { App } = directRequire('./app');
  return (
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
};
