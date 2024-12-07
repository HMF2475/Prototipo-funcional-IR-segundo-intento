import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Input, Label, Link} from 'reactstrap';
import useFetchState from '../util/useFetchState';
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import { useNavigate } from "react-router-dom";


const jwt = tokenService.getLocalAccessToken();
export default function ListaUsuarios() {
  const [visible, setVisible]= useState(false)
  const [message, setMessage] = useState(null);

  const [perfiles, setPerfiles] = useFetchState(
    [], "/api/kubico/usuarios", jwt, setMessage, setVisible
  );



  const[perfil, setPerfil] = useState(null)
  const [mostrarDatosPerfil, setMostrarDatosPerfil] = useState(false);
  // TODO
  const handleAddUser = () => {
    console.log('Añadir Usuario');
  };



  const [borrarTrigger, setBorrarTrigger] = useState(0)
  useEffect(() => { //¿Hace falta que sea así?
    let intervalId;

    function fetchUsuarios() {
        
        fetch(
            '/api/kubico/usuarios',
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setPerfiles(data);
                
            })
    }
    fetchUsuarios();

    intervalId = setInterval(fetchUsuarios, 1000);
    
    return () => clearInterval(intervalId)
},[borrarTrigger])


  const handleDeleteUser = (perfil) => {
    fetch(`/api/kubico/usuarios/borrar?username=${perfil.username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        
      }).then((response) => response.json())
              .then((data) => {
                setBorrarTrigger((anterior)=> anterior+1)
              })
              .catch((error) => {
                setMessage("Error al borrar el perfil");
                setVisible(true);
              });
          
  };

  
  const handleViewDetails = (perfil) => {
        setPerfil(perfil)
        setMostrarDatosPerfil(true)
  };

  const modal = getErrorModal(setVisible, visible, message);
  const navigate = useNavigate();

  

  function handleSubmit(event) {
    event.preventDefault();
    const updatedPerfil = {
        ...perfil,
        
        
    };
    
    fetch("/api/kubico/perfil/edit", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerfil),
    })
    .then((response) => response.text())
    .then((data) => {
      if (data === "RELOG") {
        tokenService.removeUser()
        navigate("/login");
      } else if (data === "HOME") {
        console.log(data)
        navigate("/home");
      } else {
        let json = JSON.parse(data);
        if (json.message) {
          let mensaje = "Status Code: " + json.statusCode + " -> " + json.message;
          setMessage(mensaje);
          setVisible(true);
        } else {
          navigate("/home");
        }
      }
    })
    .catch((error) => alert(error.message));
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setPerfil({ ...perfil, [name]: value });
  }




  return (
    <div style={{ padding: '20px' }}>
      <h3>
        Lista de Usuarios{' '}
        <Button color="success" onClick={handleAddUser}>
          Añadir Usuario
        </Button>
      </h3>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {!mostrarDatosPerfil &&<Table responsive striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {perfiles.length > 0 ? (
            perfiles.map((perfil, index) => (
              <tr key={index}>
                <td>{perfil.username}</td>
                <td>{perfil.authority}</td>
                <td>
                  <Button color="danger" onClick={() => handleDeleteUser(perfil)}>
                    Borrar Usuario
                  </Button>{' '}
                  <Button color="primary" onClick={() => handleViewDetails(perfil)}>
                    Ver Detalles
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                No hay usuarios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>}
      {mostrarDatosPerfil && (<>
        
      {modal}
       
            
             <Form onSubmit={handleSubmit}>
              {/* Datos del Usuario */}
              <div className="custom-form-input">
                <Label for="username" className="custom-form-input-label">Nombre de usuario</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={perfil.username || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              {perfil.authority !== "CLIENTE" && <div className="custom-form-input">
                <Label for="authority" className="custom-form-input-label">Nombre de usuario</Label>
                <Input
                  type="text"
                  name="authority"
                  id="authority"
                  value={perfil.authority || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>}

            
              <div className="custom-form-input">
                <Label for="firstName" className="custom-form-input-label">Nombre</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={perfil.firstName || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="second_name" className="custom-form-input-label">Segundo</Label>
                <Input
                  type="text"
                  name="second_name"
                  id="second_name"
                  value={perfil.second_name || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="telefono" className="custom-form-input-label">Telefono</Label>
                <Input
                  type="text"
                  name="telefono"
                  id="telefono"
                  value={perfil.telefono || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="direccion" className="custom-form-input-label">Direccion</Label>
                <Input
                  type="text"
                  name="direccion"
                  id="direccion"
                  value={perfil.direccion || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="sexo" className="custom-form-input-label">Sexo</Label>
                <Input
                  type="text"
                  name="sexo"
                  id="sexo"
                  value={perfil.sexo || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="lastName" className="custom-form-input-label">Apellido</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={perfil.lastName || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
            
              
              <div className="custom-button-row">
                <button className="auth-button">Guardar</button>
                <Button onClick={() => {
                    setPerfil(null)
                    setMostrarDatosPerfil(false)
                }}>Volver</Button>
              </div>
            </Form>
          
          </>)}
    </div>
  );
}
