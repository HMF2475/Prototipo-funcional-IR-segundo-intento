
import { useEffect, useRef, useState } from "react";
import { Button, Table, Form, Input, Label, Link } from 'reactstrap';
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [perfilNuevo, setPerfilNuevo] = useState({})
  const sexos = ["Hombre", "Mujer", "Otro"];
    const navigate = useNavigate();

  function handleChangeNuevo(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setPerfilNuevo({ ...perfilNuevo, [name]: value });
  }

  function handleSubmitNuevo(event) {
    event.preventDefault();
    const updatedPerfil = {
      ...perfilNuevo,
      sexo: perfilNuevo.sexo?.toUpperCase(),
      authority: "CLIENTE"



    };
    

    fetch("/api/kubico/perfil/crearOtro", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerfil),
    })
      .then((response) => response.text())
      .then((data) => {
        navigate("/login")
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div className="auth-page-container">
      <h1>Registrarse</h1>
      <div style={{ backgroundColor: '#4d5650' }}>
        <div className="auth-form-container">
          <Form onSubmit={handleSubmitNuevo}>
            <div className="custom-form-input">
              <Label for="username" className="custom-form-input-label">Nombre de usuario</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={perfilNuevo.username || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">
              <Label for="password" className="custom-form-input-label">Contraseña</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={perfilNuevo.password || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>



            <div className="custom-form-input">
              <Label for="firstName" className="custom-form-input-label">Nombre</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                value={perfilNuevo.firstName || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">
              <Label for="second_name" className="custom-form-input-label">Segundo nombre</Label>
              <Input
                type="text"
                name="second_name"
                id="second_name"
                value={perfilNuevo.second_name || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">
              <Label for="lastName" className="custom-form-input-label">Apellido</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={perfilNuevo.lastName || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">
              <Label for="telefono" className="custom-form-input-label">Telefono</Label>
              <Input
                type="phone"
                name="telefono"
                id="telefono"
                value={perfilNuevo.telefono || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">
              <Label for="direccion" className="custom-form-input-label">Direccion</Label>
              <Input
                type="text"
                name="direccion"
                id="direccion"
                value={perfilNuevo.direccion || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">
              <Label for="sexo" className="custom-form-input-label">Sexo</Label>
              <Input
                type="select"
                name="sexo"
                id="sexo"
                value={perfilNuevo.sexo || ""}
                onChange={handleChangeNuevo}
                className="custom-input"
              >
                <option value="" disabled>Selecciona una opción</option>
                {sexos.map((sexo) => (
                  <option key={sexo} value={sexo.toUpperCase()}>
                    {sexo}
                  </option>
                ))}
              </Input>
            </div>



            <div className="custom-button-row">
              <button className="auth-button">Guardar</button>
                <Button onClick={()=> navigate("/")}>Volver</Button>
            </div>
          </Form>
        </div>
      </div>
      </div>
      );
      
  
}
