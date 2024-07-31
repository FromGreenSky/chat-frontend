import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

const Chat = () => {
  window.addEventListener('load', () => {
    localStorage.clear();
  });
  const { messages, sendMessage } = useSocket();
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const handleSendMessage = async () => {
    if (content.trim() && user) {
      try {
        await sendMessage(content);
        setContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.warn('Content is empty or user is not authenticated.');
    }
  };

  return (
    <div className='mainChat'>
      <div>
        {messages.map(message => (
          <div key={message.id} className='message'>
            <p>Message: {message.content}</p>
            <small>From: {message.senderUsername}</small>
          </div>
        ))}
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;