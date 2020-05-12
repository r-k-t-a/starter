import { WsConnection } from '@logux/core';
import { WebSocket, Server } from 'mock-socket';

export const createLoguxBridge = () => {
  const url = 'ws://fake-server';
  const mockConnection = new WsConnection(url, WebSocket, { env: 'development' });
  const mockServer = new Server(url);
  mockServer.on('connection', (socket) => {
    socket.on('message', () => {});
    socket.on('close', () => {});

    socket.send('message');
    socket.close();
  });
  return {
    mockConnection,
    mockServer,
  };
};
