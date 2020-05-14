/* eslint-disable global-require, @typescript-eslint/no-var-requires, no-underscore-dangle, @typescript-eslint/camelcase */
import { jsx, CacheProvider, EmotionCache } from '@emotion/core';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { LoguxReduxStore } from '@logux/redux';
import { rootReducer } from 'reducers';

import { createLoguxCreator, LoguxBridge } from '../../../logux';
import { App } from '../../../App';

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
