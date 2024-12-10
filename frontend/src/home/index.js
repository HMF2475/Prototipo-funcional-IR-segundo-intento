import React, { useState } from 'react';
import '../App.css';
import '../static/css/home/home.css';
import tokenService from '../services/token.service.js';
import { RiQuestionnaireLine } from "react-icons/ri";
import ChatComponent from '../chat/ChatComponent'; // Ajusta el path si es necesario

export default function Home() {
    const usuario = tokenService.getUser();
    const [viewChat, setViewChat] = useState(false);

    return (
        <div className="home-page-container">
            {usuario.roles !== 'CAMBIAR' &&
                <div style={{
                    position: 'fixed',  // Posiciona el ícono respecto a la ventana
                    bottom: '30px',     // Coloca el ícono 30px arriba del borde inferior
                    right: '30px',      // Coloca el ícono 30px a la izquierda del borde derecho
                    fontSize: '60px',   // Tamaño del ícono
                    cursor: 'pointer',  // Cambia el cursor a mano
                    zIndex: 9999        // Asegura que el ícono esté encima de otros elementos
                }}>
                    {!viewChat &&
                        <RiQuestionnaireLine style={{ color: 'red' }} onClick={() => setViewChat(true)} />
                    }
                    {viewChat &&
                        <ChatComponent closeChat={() => setViewChat(false)} /> // Pasar la función como prop
                    }
                </div>
            }
        </div>
    );
}
