import React, { useState } from 'react';
import './ChatComponent.css';

const ChatComponent = ({ closeChat }) => { // Recibe la función closeChat como prop
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { user: 'Usuario', text: newMessage, timestamp };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const botResponse = { user: 'Amigo', text: 'Será atendido en breves instantes...', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 3000);
  };

  return (
    <div className="chat-container">
<div className="chat-header">
  <h2>Chat</h2>
  <button className="close-chat-button" onClick={closeChat} title="Cerrar chat">×</button>
</div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === 'Usuario' ? 'user' : 'friend'}`}>
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <span className="message-time">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input" >
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
      
    </div>
  );
};

export default ChatComponent;
