import { useState, useEffect } from 'react';

import { useSocketContext } from './providers/socket-provider';

function Chat() {
  const { socket } = useSocketContext();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket?.on('message', (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket?.off('message');
    };
  }, [socket]);

  const handleSendMessage = () => {
    socket?.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="메시지 입력"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
}

export default Chat;
