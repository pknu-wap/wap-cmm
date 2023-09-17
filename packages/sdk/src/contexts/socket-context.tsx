import { Socket } from 'socket.io-client';

import createReactContext from './create-react-context';

export interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const [SocketProvider, useSocketContext] =
  createReactContext<SocketContextValue>({
    name: 'SocketContext',
    errorMessage: 'useSocketContext must be used within a SocketProvider',
    defaultValue: {
      socket: null,
      isConnected: false,
    },
  });

export { SocketProvider, useSocketContext };
