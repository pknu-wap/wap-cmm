import { useEffect, useRef } from 'react';

import { Socket, io } from 'socket.io-client';

const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('http://localhost:8080', {
      transports: ['websocket'],
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);
};

export default useSocket;
