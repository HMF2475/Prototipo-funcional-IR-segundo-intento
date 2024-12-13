import React, { useState } from "react";
import tokenService from "../services/token.service";
import getErrorModal from "./../util/getErrorModal";
import useFetchState from "../util/useFetchState";
import { Form, Input, Label } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";

const jwt = tokenService.getLocalAccessToken();

export default function Profile() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [newPassword, setNewPassword] = useState();

  const [perfil, setPerfil] = useFetchState(
    {}, "/api/kubico/perfil", jwt, setMessage, setVisible
  );


  
  const modal = getErrorModal(setVisible, visible, message);
  const navigate = useNavigate();

  

  function handleSubmit(event) {
    event.preventDefault();
    const updatedPerfil = {
        ...perfil,
        
        password: newPassword ? newPassword : undefined 
        
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


  function handlePasswordChange(event) {
    setNewPassword(event.target.value);
  }

  return (
    <div style={{ backgroundImage: 'url(/fondos/fondologin.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
      <div className="auth-page-container">
      {modal}
       <div className="hero-div">
          <h1 className="text-center">Editar perfil</h1>
          <div className="auth-form-container">
            
             <Form onSubmit={handleSubmit}>
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
              <div className="custom-form-input">
                <Label for="password" className="custom-form-input-label">Contraseña</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="custom-input"
                  placeholder="Deja este campo vacío si no deseas cambiar la contraseña"
                />
              </div>

            
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
                <Link to={`/home`} className="auth-button" style={{ textDecoration: "none" }}>
                  Volver
                </Link>
              </div>
            </Form>
          
          </div>
        </div>
        
        
      
        

         
        </div>
        
        
        
          
    </div>
    
    
  );
}
