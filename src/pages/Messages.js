import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/messages', {
        content: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Messages;