import { createLoguxCreator as loguxCreateLoguxCreator } from '@logux/redux';
import { LoguxStoreCreator } from '@logux/redux/create-logux-creator';
import { version } from '../../package.json';
import { LoguxBridge } from './bridge';

export const createLoguxCreator = (bridge: LoguxBridge): LoguxStoreCreator => {
  const createStore = loguxCreateLoguxCreator({
    server: bridge.clientConnection,
    subprotocol: version,
    token: 'ssrToken',
    userId: 'ssrID',
  });
  return createStore;
};
