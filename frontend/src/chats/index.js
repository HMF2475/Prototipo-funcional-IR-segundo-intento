import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import './ChatPage.css';
import { useNavigate } from 'react-router-dom';
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();
function ChatPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState('');
  const [showPedido, setShowPedido] = useState(false);
  const [clienteActual,setClienteActual]= useState('');
  const [photoUrl,setPhotoUrl]=useState('http://localhost:8080/resources/images/fotoArmario.jpg');
  const [chats, setChats] = useState([
    { id: 1, name: 'Manolo Rodríguez Domínguez', date: '12/10/2024', type: 'Consulta general' },
    { id: 2, name: 'Juan Garcia Fernández', date: '24/06/2024', type: 'Pedido Armario Salón' },
    { id: 3, name: 'David Durán Ramírez', date: '05/03/2024', type: 'Pedido Vestidor Cuarto Infantil' },
    { id: 4, name: 'Alba Pedroso Alcántara', date: '06/03/2024', type: 'Consulta general' }
  ]);

  function getFechaAleatoria(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio).getTime();
    const fin = new Date(fechaFin).getTime();
    const tiempoAleatorio = Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
    const fechaAleatoria = new Date(tiempoAleatorio);

    const dia = String(fechaAleatoria.getDate()).padStart(2, '0');
    const mes = String(fechaAleatoria.getMonth() + 1).padStart(2, '0');
    const anio = fechaAleatoria.getFullYear();

    return `${dia}/${mes}/${anio}`;
}



  const pedidoDetalles = {
    id: 1,
    referencia: 'prueba3',
    precio: Math.floor(Math.random() * (300 - 100 + 1)) + 100,
    fechaEstimada: getFechaAleatoria('2025-01-09', '2025-02-31'),
    fechaPedido:  getFechaAleatoria('2024-11-01', '2024-12-31'),
    estado: 'ACEPTADO',
    foto:photoUrl,
    cliente:clienteActual




  }

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'Todos' || chat.type === filterType || chat.type.includes(filterType);

    const chatDate = new Date(chat.date.split('/').reverse().join('-'));
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    const matchesDate = !selectedDate || chatDate.toDateString() === selectedDateObj.toDateString();

    return matchesSearch && matchesFilter && matchesDate;
  });


  return (
    <>
      {!showPedido &&
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
                  {chat.type === 'Consulta general' &&
                    <p className="chat-type" style={{ color: 'green' }}>{chat.type}</p>
                  }
                  {chat.type !== 'Consulta general' &&
                    <p className="chat-type"
                      onClick={() =>{ 
                        if(chat.type==='Pedido Vestidor Cuarto Infantil'){
                          setPhotoUrl('http://localhost:8080/resources/images/fotoVestidor.jpg')
                        }
                        setClienteActual(chat.name)
                        setShowPedido(true)
                      }}
                      style={{ color: 'red', cursor: 'pointer' }}>{chat.type}</p>
                  }
                  <p className="chat-date">{chat.date}</p>
                </div>
                <div className="chat-actions">
                  <button
                    className="open-button"
                    onClick={() => navigate(`/privateChat`)}
                  >
                    Abrir chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      {showPedido &&
        <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '600px', height: '800px' }}>
          <h5>Referencia: {pedidoDetalles.referencia}</h5>
          <p><strong>Precio:</strong> {pedidoDetalles.precio}€</p>
          <p><strong>Fecha Estimada:</strong> {pedidoDetalles.fechaEstimada}</p>
          <p><strong>Fecha de Pedido:</strong> {pedidoDetalles.fechaPedido}</p>
          <p><strong>Fecha de Pago:</strong> {pedidoDetalles.fechaPedido}</p>
          <p><strong>Estado:</strong> {pedidoDetalles.estado}</p>

          <h6>Cliente:</h6>
          <p>{pedidoDetalles.cliente}</p>

          <h6>Diseño:</h6>
          <img src={pedidoDetalles.foto}
            alt="Foto del diseño"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            onError={(e) => (e.target.style.display = 'none')}
          />

          <button color="secondary" onClick={() => setShowPedido(false)}>Cerrar</button>
        </div>

      }
    </>
  );
}

export default ChatPage;
