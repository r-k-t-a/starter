import { Connection } from '@logux/core';

// https://github.com/logux/core/blob/36c604158b49697790e96c6e6919c22752e231cb/ws-connection/index.js#L3

export class ClientConnection extends Connection {
  constructor(url, WS, opts) {
    this.connected = false;
    this.emitter = createNanoEvents();
    this.WS = WebSocket;
    this.url = url;
    this.opts = opts;
    super();
  }

  init(ws) {
    ws.onerror = (event) => {
      this.emitter.emit('error', event.error || new Error('WS Error'));
    };

    ws.onclose = () => {
      if (this.ws) {
        this.connected = false;
        this.emitter.emit('disconnect');
      }
    };

    ws.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        this.error(event.data);
        return;
      }
      this.emitter.emit('message', data);
    };

    this.ws = ws;
  }

  connect() {
    this.emitter.emit('connecting');
    this.init(new this.WS(this.url, undefined, this.opts));

    return new Promise((resolve) => {
      this.ws.onopen = () => {
        this.connected = true;
        this.emitter.emit('connect');
        resolve();
      };
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.onclose();
      this.ws.close();
      this.ws = undefined;
    }
  }

  on(event, listener) {
    return this.emitter.on(event, listener);
  }

  send(message) {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.emitter.emit('error', new Error('WS was closed'));
    }
  }

  error(message) {
    let err = new Error('Wrong message format');
    err.received = message;
    this.emitter.emit('error', err);
  }
}
