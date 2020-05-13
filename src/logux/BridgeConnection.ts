import { Connection } from '@logux/core';
import { createNanoEvents, Emitter, DefaultEvents, Unsubscribe } from 'nanoevents';

export class BridgeConnection implements Connection {
  constructor(name: string) {
    this.connected = false;
    this.emitter = createNanoEvents();
    this.name = name;
  }

  connected: boolean;

  emitter: Emitter<DefaultEvents>;

  name: string;

  peer: BridgeConnection;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,class-methods-use-this
  async connect(): Promise<void> {}

  async addPeer(peer: BridgeConnection): Promise<void> {
    this.peer = peer;
    this.connected = true;
  }

  disconnect(): void {
    this.connected = false;
    this.emitter.emit('disconnect');
  }

  send: Connection['send'] = (message): void => {
    if (this.connected) this.peer.emitter.emit('message', message);
  };

  on(
    event: 'connecting' | 'connect' | 'disconnect' | 'message' | 'error',
    listener: () => void,
  ): Unsubscribe {
    return this.emitter.on(event, listener);
  }
}
