import React, { useState } from 'react';
import '../App.css';
import '../static/css/home/home.css';
import tokenService from '../services/token.service.js';
import { RiQuestionnaireLine } from "react-icons/ri";
import ChatComponent from '../SmallChat/ChatComponent.js';
import { Link } from 'react-router-dom';

export default function Home() {
    const usuario = tokenService.getUser();
    const [viewChat, setViewChat] = useState(false);

    return (
        <div className="home-page-container">

            {usuario && usuario.roles == 'CLIENTE' &&
                <>

                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#f5f5f5',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>¡Bienvenido {usuario.username}!</h2>
                        <Link to="/diseños" style={{
                            display: 'inline-block',
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            fontSize: '16px'
                        }}>¡Comencemos a diseñar!</Link>
                    </div>
                    <div style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        fontSize: '60px',
                        cursor: 'pointer',
                        zIndex: 1
                    }}>
                        {!viewChat &&
                            <RiQuestionnaireLine style={{ color: 'red' }} onClick={() => setViewChat(true)} />
                        }
                        {viewChat &&
                            <ChatComponent closeChat={() => setViewChat(false)} />
                        }
                    </div>
                </>
            }
        </div>

        

    );
}
