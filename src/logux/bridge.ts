import { BridgeConnection } from './BridgeConnection';

export type LoguxBridge = {
  clientConnection: BridgeConnection;
  serverConnection: BridgeConnection;
};

export const createLoguxBridge = (): LoguxBridge => {
  const clientConnection = new BridgeConnection('client');
  const serverConnection = new BridgeConnection('server');

  clientConnection.addPeer(serverConnection);
  serverConnection.addPeer(clientConnection);

  return {
    clientConnection,
    serverConnection,
  };
};
