import { useState, useEffect } from 'react';

import { useSocketContext } from './contexts/socket-context';

function Chat() {
  const { socket } = useSocketContext();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // 메시지 수신 이벤트 핸들러를 등록합니다.
    socket.on('message', (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러를 해제합니다.
      socket.off('message');
    };
  }, [socket]);

  const handleSendMessage = () => {
    // 메시지 전송
    socket.emit('message', message);
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

export default Chat;
