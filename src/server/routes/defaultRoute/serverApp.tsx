/* eslint-disable global-require, @typescript-eslint/no-var-requires, no-underscore-dangle, @typescript-eslint/camelcase */
import { jsx, CacheProvider, EmotionCache } from '@emotion/core';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { createLoguxCreator, LoguxReduxStore } from '@logux/redux';
import { rootReducer } from 'reducers';

import { LoguxBridge } from '../../loguxBridge';
import { version } from '../../../../package.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __non_webpack_require__: any;
const directRequire = __non_webpack_require__;

interface Props {
  bridge: LoguxBridge;
  emotionCache: EmotionCache;
  helmetContext: {};
  location: string;
  routerContext: StaticRouter['context'];
}

export const serverApp = ({
  bridge,
  emotionCache,
  helmetContext,
  location,
  routerContext,
}: Props): [JSX.Element, LoguxReduxStore] => {
  const { App } = directRequire('./app');

  const createStore = createLoguxCreator({
    server: bridge.clientConnection,
    subprotocol: version,
    token: 'ssrToken',
    userId: 'ssrID',
  });

  const reduxStore = createStore(rootReducer);
  return [
    <ReduxProvider store={reduxStore}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter context={routerContext} location={location}>
          <CacheProvider value={emotionCache}>
            <App />
          </CacheProvider>
        </StaticRouter>
      </HelmetProvider>
    </ReduxProvider>,
    reduxStore,
  ];
};
