import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import './ChatPage.css';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Todos');
    const [selectedDate, setSelectedDate] = useState('');

    const chats = [
        { id: 1, name: 'Manolo Rodríguez Domínguez', date: '12/10/2024', type: 'Consulta general' },
        { id: 2, name: 'Laura López Jiménez', date: '15/10/2024', type: 'Pedido Y' },
        { id: 3, name: 'Rodrigo Gómez García', date: '09/08/2024', type: 'Pedido X' },
    ];

    const filteredChats = chats.filter((chat) => {
        const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'Todos' || chat.type === filterType || chat.type.includes(filterType);

        const chatDate = new Date(chat.date.split('/').reverse().join('-'));
        const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
        const matchesDate = !selectedDate || chatDate.toDateString() === selectedDateObj.toDateString();

        return matchesSearch && matchesFilter && matchesDate;
    });


    return (
        <div className="chat-page-container">
            <h1 className="chat-title">Chats</h1>

            <div className="filters-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Pedido">Pedido</option>
                    <option value="Consulta general">Consulta general</option>
                </select>
                <input
                    type="date"
                    className="date-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            <div className="chat-list">
      {filteredChats.map((chat) => (
        <div key={chat.id} className="chat-item">
          <div className="chat-info">
            <h3 className="chat-name">{chat.name}</h3>
            <p className="chat-type">{chat.type}</p>
            <p className="chat-date">{chat.date}</p>
          </div>
          <div className="chat-actions">
            <button
              className="open-button"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              Abrir chat
            </button>
          </div>
        </div>
      ))}
    </div>
        </div>
    );
}

export default ChatPage;
