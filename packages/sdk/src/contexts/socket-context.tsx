import { Socket } from 'socket.io-client';

import createReactContext from './create-react-context';

export interface SocketProviderProps {
  children: React.ReactNode;
}

export interface SocketContextValue {
  socket: Socket;
}

const [SocketProvider, useSocketContext] = createReactContext({
  name: 'SocketContext',
  errorMessage: 'useSocketContext must be used within a SocketProvider',
});

export { SocketProvider, useSocketContext };
