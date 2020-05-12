import { Connection } from './Connection';

export type LoguxBridge = {
  clientConnection: Connection;
  serverConnection: Connection;
};

export const createLoguxBridge = (): LoguxBridge => {
  const clientConnection = new Connection('client');
  const serverConnection = new Connection('server');

  clientConnection.init(serverConnection);
  serverConnection.init(clientConnection);

  return {
    clientConnection,
    serverConnection,
  };
};
