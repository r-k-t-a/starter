import { Connection } from './Connection';

export type LoguxBridge = {
  clientConnection: Connection;
  serverConnection: Connection;
};

export const createLoguxBridge = (): LoguxBridge => {
  const clientConnection = new Connection('client');
  const serverConnection = new Connection('server');

  clientConnection.addPeer(serverConnection);
  serverConnection.addPeer(clientConnection);

  return {
    clientConnection,
    serverConnection,
  };
};
