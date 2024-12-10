import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OpenChat.css';

function OpenChat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const chat = {
    id,
    name: 'Manolo Rodríguez Domínguez',
    date: '12/10/2024',
    type: 'Consulta general',
    messages: [
      { sender: 'Manolo Rodríguez', content: 'Hola buenassss, quería saber cuánto costaría un armario?', time: '3:00 PM' },
      { sender: 'Tú', content: '¡Hola! ¿Cómo está? Ya mismo le digo.', time: '3:05 PM' },
    ],
  };

  return (
    <div className="open-chat-container">
      <div className="chat-header">
        <div className="chat-user-info">
          <h2>Chat con {chat.name}</h2>
          <p className="chat-type">{chat.type}</p>
          <p className="chat-created">Creado {chat.date}</p>
        </div>
        <button className="close-button" onClick={() => navigate(-1)}>X</button>
      </div>
      <div className="chat-messages">
        {chat.messages.map((message, index) => (
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
        <input type="text" placeholder="Escribe aquí..." className="message-input" />
      </div>
    </div>
  );
}

export default OpenChat;
