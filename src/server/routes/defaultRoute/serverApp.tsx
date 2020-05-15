/* eslint-disable global-require, @typescript-eslint/no-var-requires, no-underscore-dangle, @typescript-eslint/camelcase */
import { jsx, CacheProvider, EmotionCache } from '@emotion/core';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { LoguxReduxStore } from '@logux/redux';
import { rootReducer } from 'src/reducers';

import { createLoguxCreator, LoguxBridge } from '../../../logux';

type Props = {
  bridge: LoguxBridge;
  emotionCache: EmotionCache;
  helmetContext: {};
  location: string;
  routerContext: StaticRouter['context'];
};

export const serverApp = ({
  bridge,
  emotionCache,
  helmetContext,
  location,
  routerContext,
}: Props): [JSX.Element, LoguxReduxStore] => {
  const { App } = require('../../../App');
  const createStore = createLoguxCreator(bridge);
  const loguxReduxStore: LoguxReduxStore = createStore(rootReducer);

  return [
    <ReduxProvider store={loguxReduxStore}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter context={routerContext} location={location}>
          <CacheProvider value={emotionCache}>
            <App />
          </CacheProvider>
        </StaticRouter>
      </HelmetProvider>
    </ReduxProvider>,
    loguxReduxStore,
  ];
};
