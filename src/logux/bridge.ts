import { Connection as LoguxConnection } from '@logux/core';
import { createNanoEvents, Emitter, DefaultEvents, Unsubscribe } from 'nanoevents';

export class Connection implements LoguxConnection {
  constructor(name: string) {
    this.connected = false;
    this.emitter = createNanoEvents();
    this.name = name;
  }

  connected: boolean;

  emitter: Emitter<DefaultEvents>;

  name: string;

  peer: Connection;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,class-methods-use-this
  async connect(): Promise<void> {}

  async addPeer(peer: Connection): Promise<void> {
    this.peer = peer;
    this.connected = true;
  }

  disconnect(): void {
    this.connected = false;
    this.emitter.emit('disconnect');
  }

  send: LoguxConnection['send'] = (message): void => {
    if (this.connected) this.peer.emitter.emit('message', message);
  };

  on(
    event: 'connecting' | 'connect' | 'disconnect' | 'message' | 'error',
    listener: () => void,
  ): Unsubscribe {
    return this.emitter.on(event, listener);
  }
}

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
