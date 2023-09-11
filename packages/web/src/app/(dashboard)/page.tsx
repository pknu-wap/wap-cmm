'use client';

import { useState, useEffect } from 'react';

import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'; // 서버 주소

export default function DashboardPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    // 서버로부터 메시지를 받아 상태 업데이트
    socket.on('message', (message) => {
      console.log(message);

      setMessages([...messages, message]);
    });

    return () => {
      // 컴포넌트 언마운트 시 소켓 해제
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleSendMessage = () => {
    // 메시지를 서버로 전송
    socket.emit('message', message);
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
