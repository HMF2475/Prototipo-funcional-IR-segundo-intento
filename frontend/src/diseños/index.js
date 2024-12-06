import React, { useState, useEffect } from "react";
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";
import { Table, Button, Form, Input, Label, } from "reactstrap";
import { useNavigate } from "react-router-dom";

const jwt = tokenService.getLocalAccessToken();

export default function Profile() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mostrarDatosDisenio, setMostrarDatosDisenio] = useState(false);
  const [disenioId, setDisenioId] = useState(null);
  const [disenioDetalles, setDisenioDetalles] = useState(null);
  const [encargarTrigger, setEncargarTrigger] = useState(0)
  const [borrarTrigger, setBorrarTrigger] = useState(0)


  // Usamos el hook useFetchState para obtener los disenios
  const [disenios, setDisenios] = useFetchState(
    {}, "/api/kubico/disenios", jwt, setMessage, setVisible
  );


  useEffect(() => { //¿Hace falta que sea así?
    let intervalId;

    function fetchDisenios() {
        
        fetch(
            '/api/kubico/disenios',
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setDisenios(data);
                
            })
    }
    fetchDisenios();

    intervalId = setInterval(fetchDisenios, 4000);
    
    return () => clearInterval(intervalId)
},[ disenioId, borrarTrigger, encargarTrigger])


  const modal = getErrorModal(setVisible, visible, message);
  const navigate = useNavigate();

  // Función para redirigir a la página de inicio
  const goHome = () => {
    navigate("/");
  };

  // Función para abrir los detalles del disenio
  const verDetallesDisenio = (id) => {
    setDisenioId(id);
    fetch(`/api/kubico/disenios/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDisenioDetalles(data);
        setMostrarDatosDisenio(true);
      })
      .catch((error) => {
        setMessage("Error al cargar los detalles del disenio.");
        setVisible(true);
      });
  };

  
  function encargarDisenio () {
    const updatedDisenio = {
        ...disenioDetalles,
        
        
    };
    fetch(`/api/kubico/disenios/${updatedDisenio.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDisenio),
    })
      .then(response => response.json())
      .then(data => {

        setMessage("Disenio encargado");
        setVisible(true);
        setMostrarDatosDisenio(false); 
        setEncargarTrigger((anterior)=> anterior+1)
      })
      .catch(error => {
        setMessage("Error al encargar el disenio.");
        setVisible(true);
      });
  };

  function handleDeleteDisenio (id)  {
    fetch(`/api/kubico/disenios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        
      }).then((response) => response.json())
              .then((data) => {
                setBorrarTrigger((anterior)=> anterior+1)
                setMostrarDatosDisenio(false)
                setDisenioDetalles(null)
              })
              .catch((error) => {
                setMessage("Error al borrar el disenioDetalles");
                setVisible(true);
              });
          
  };

  const cerrarModal = () => {
    setMostrarDatosDisenio(false);
    setDisenioDetalles(null);
  };

  
  function handleSubmit(event) {
    event.preventDefault();
    const updatedDisenio = {
        ...disenioDetalles,
        
        
    };
    
    fetch(`/api/kubico/disenios/${disenioDetalles.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDisenio),
    })
    .then((response) => response.text())
    .then((data) => {
        setBorrarTrigger((prev)=> prev+1)
        setDisenioDetalles(null)
        setMostrarDatosDisenio(false)
    })
    .catch((error) => alert(error.message));
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setDisenioDetalles({ ...disenioDetalles, [name]: value });
  }


  return (
    <div style={{ backgroundImage: '', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
      <div className="auth-page-container">
        {modal}

        {/* Botón de cerrar para volver a home */}
        <div style={{right: '10px', top: '80px', position: 'absolute'}}>
          <button onClick={goHome} className="close-button">X</button>
        </div>

        {/* Tabla de disenios */}
        {!mostrarDatosDisenio && (
          <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '600px', height: '800px' }}>
            <h3>Lista de diseños</h3>
            {disenios.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Fecha Estimada</th>
                    <th>Precio Estimado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {disenios.map((disenio) => (
                    <tr key={disenio.id}>
                      <td>{disenio.nombre}</td>
                      <td>{disenio.tipo}</td>
                      <td>{new Date(disenio.fechaEstimada).toLocaleDateString()}</td>
                      <td>{disenio.precioEstimado}</td>
                      <td>
                        <Button color="primary" onClick={() => verDetallesDisenio(disenio.id)}>
                          Ver Detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No hay disenios disponibles.</p>
            )}
          </div>
        )}

        {/* Modal de detalles del disenio */}
        {mostrarDatosDisenio && disenioDetalles && (
          <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width:'600px', height:'800px' }}>
            {console.log(disenioDetalles)}
            <h5>Nombre: {disenioDetalles.nombre}</h5>
              <p><strong>Precio Estimado:</strong> {disenioDetalles.precioEstimado}€</p>
              <p><strong>Fecha Estimada:</strong> {new Date(disenioDetalles.fechaEstimada).toLocaleDateString()}</p>
              <p><strong>Tipo de mueble:</strong> {disenioDetalles.tipo}</p>

            <Form onSubmit={handleSubmit}>
              {/* Datos del pedido */}
              <div className="custom-form-input">
                <Label for="alto" className="custom-form-input-label">Alto</Label>
                <Input
                  type="text"
                  name="alto"
                  id="alto"
                  value={disenioDetalles.alto || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
             <div className="custom-form-input">
                <Label for="ancho" className="custom-form-input-label">Ancho</Label>
                <Input
                  type="text"
                  name="ancho"
                  id="ancho"
                  value={disenioDetalles.ancho || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>

            
              <div className="custom-form-input">
                <Label for="fondo" className="custom-form-input-label">Fondo</Label>
                <Input
                  type="text"
                  name="fondo"
                  id="fondo"
                  value={disenioDetalles.fondo || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="tipoPuerta" className="custom-form-input-label">Tipo puerta</Label>
                <Input
                  type="text"
                  name="tipoPuerta"
                  id="tipoPuerta"
                  value={disenioDetalles.tipoPuerta || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              <div className="custom-form-input">
                <Label for="numPuertas" className="custom-form-input-label">Numero de puertas</Label>
                <Input
                  type="text"
                  name="numPuertas"
                  id="numPuertas"
                  value={disenioDetalles.numPuertas || ""}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>
              
            
              
              <div className="custom-button-row">
                <button className="auth-button">Guardar cambios</button>
              </div>
            </Form>
            {disenioDetalles ? (
                <img src={disenioDetalles.foto}
                alt="Foto del diseño"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                onError={(e) => (e.target.style.display = 'none')}/>
              ) : (
                <p>Cargando...</p>
              )}

            {/* Mostrar botones Aprobar y Desaprobar si el estado es "EN_REVISION" */}
            {(
              <div>
                <Button color="success" onClick={() => encargarDisenio()}>Encargar</Button>
                
                <Button color="danger" onClick={()=> handleDeleteDisenio(disenioDetalles.id)}>Borrar disenio</Button>
              </div>
            )}

            <button color="secondary" onClick={cerrarModal}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}
