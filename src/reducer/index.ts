import { combineReducers } from 'redux';
import { createLoguxCreator } from '@logux/redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { version } from '../../package.json';
import { page } from './page';

export * from './page';

export const rootReducer = combineReducers({
  page,
});
export type RootState = ReturnType<typeof rootReducer>;

interface Config {
  server?: string;
  subprotocol?: string;
  token: string;
  userId: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStore = (config: Config, preloadedState: {}) =>
  createLoguxCreator({
    server: process.env.CLIENT__LOGUX_URL as string,
    subprotocol: version,
    ...config,
  })(rootReducer, preloadedState, composeWithDevTools());
