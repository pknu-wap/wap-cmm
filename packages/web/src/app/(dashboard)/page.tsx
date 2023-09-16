'use client';

import { useState, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

export default function DashboardPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io('http://localhost:8080').connect();

    // 서버로부터 메시지를 받아 상태 업데이트
    socketRef.current.on('message', (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect();
      }
    };
  }, [socketRef]);

  const handleSendMessage = () => {
    // 메시지를 서버로 전송
    socketRef.current?.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <h1>실시간 채팅 애플리케이션</h1>
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
