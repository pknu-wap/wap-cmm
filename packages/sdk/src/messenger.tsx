import socketIOClient from 'socket.io-client';

import { SocketProvider } from './contexts/socket-context';

interface MessengerProps {
  children: React.ReactNode;
}

const Messenger = ({ children }: MessengerProps) => {
  return (
    <SocketProvider
      value={{
        socket: socketIOClient('http://localhost:8080'),
      }}
    >
      {children}
    </SocketProvider>
  );
};

export default Messenger;
