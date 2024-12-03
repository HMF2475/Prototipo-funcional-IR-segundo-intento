import React from 'react';
import './ChatComponent.css';

const ChatComponent = () => {
  // Predefinir los mensajes del chat
  const messages = [
    { user: 'Usuario', text: 'Hola, ¿cómo estás?', timestamp: '10:00 AM' },
    { user: 'Amigo', text: '¡Hola! Todo bien, ¿y tú?', timestamp: '10:02 AM' },
    { user: 'Usuario', text: 'Estoy bien, gracias por preguntar. ¿Qué has estado haciendo?', timestamp: '10:03 AM' },
    { user: 'Amigo', text: 'He estado trabajando en un proyecto. ¿Y tú?', timestamp: '10:05 AM' },
    { user: 'Usuario', text: 'Lo mismo, un poco de trabajo y descansando. ¿Te gustaría salir este fin de semana?', timestamp: '10:06 AM' },
    { user: 'Amigo', text: '¡Claro! Me encantaría. ¿A qué hora?', timestamp: '10:08 AM' }
  ];

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat con Amigo</h2>
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
      <div className="chat-input">
        <input type="text" placeholder="Escribe un mensaje..." />
        <button>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
