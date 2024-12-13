import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OpenChat.css';

function OpenChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'Manolo Rodríguez', content: 'Buenas tardes, ¿Hacen pedidos a domicilio?', time: '3:00 PM' },
    { sender: 'Tú', content: '¡Hola! ¿Cómo está? ¡Claro! Ahora puede realizar el pedido desde la web', time: '3:02 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const chat = {
    id,
    name: 'Manolo Rodríguez Domínguez',
    date: '12/10/2024',
    type: 'Consulta general',
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { sender: 'Tú', content: newMessage, time: currentTime }]);
      setNewMessage('');
    }
  };

  return (
    <div className="open-chat-container">
      <div className="chat-header">
        <div className="chat-user-info">
          <h2>Chat con {chat.name}</h2>
          <p className="chat-type">{chat.type}</p>
          <p className="chat-created">Creado {chat.date}</p>
        </div>
        <button className="close-button" onClick={() => navigate('/chats')}>X</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble ${message.sender === 'Tú' ? 'sent' : 'received'}`}
          >
            <p>{message.content}</p>
            <span className="message-time">{message.time}</span>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Escribe aquí..."
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button className="send-button" onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default OpenChat;
