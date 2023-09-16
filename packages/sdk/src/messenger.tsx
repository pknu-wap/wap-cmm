import { io } from 'socket.io-client';

import { SocketProvider } from './contexts/socket-context';

interface MessengerProps {
  children: React.ReactNode;
}

const Messenger = ({ children }: MessengerProps) => {
  const socket = io('http://localhost:8080').connect();

  return (
    <SocketProvider
      value={{
        socket,
      }}
    >
      {children}
    </SocketProvider>
  );
};

export default Messenger;
