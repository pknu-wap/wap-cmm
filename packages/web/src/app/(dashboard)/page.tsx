'use client';

import { useSocketContext } from '@/providers/socket-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const { socket } = useSocketContext();

  useEffect(() => {
    // 서버로부터 메시지를 받아 상태 업데이트
    socket?.on('message', (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket?.off('message');
    };
  }, [socket]);

  const handleSendMessage = () => {
    // 메시지를 서버로 전송
    socket?.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          (window.location.href = 'http://localhost:8080/api/auth/github')
        }
      >
        Github 로그인
      </button>
      <div>
        <Link href={`/login`}>Auth Page</Link>
      </div>
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
