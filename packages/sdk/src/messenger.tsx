import { SocketProvider } from './providers/socket-provider';

interface MessengerProps {
  children: React.ReactNode;
}

const Messenger = ({ children }: MessengerProps) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default Messenger;
