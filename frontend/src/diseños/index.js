import React, { useState, useEffect } from "react";
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";
import { Table, Button, Form, Input, Label, Collapse } from "reactstrap";
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
  const [listaModulos, setListaModulos] = useState([])
  const [modulosDropdownOpen, setModulosDropdownOpen] = useState(false);
  const [nuevoModulo, setNuevoModulo] = useState({})
  const [mostrarNuevoModulo, setMostrarNuevoModulo] = useState(false)
  const [crearNuevoDisenio,setCrearNuevoDisenio] = useState(false)
  const [disenioNuevo, setDisenioNuevo] = useState({})
  const [fotoGenerica, setFotoGenerica] = useState("")
  const fotoArmario = "http://localhost:8080/resources/images/fotoArmario.jpg"
  const fotoPuerta = "http://localhost:8080/resources/images/fotoPuerta.png"
  const fotoVestidor = "http://localhost:8080/resources/images/fotoVestidor.jpg"
  const tiposDeMueble = ["Armario", "Vestidor", "Frente"]
  const toggleModulosDropdown = () => {
    setModulosDropdownOpen(!modulosDropdownOpen);
  };

  
    const [imageWidth, setImageWidth] = useState(200);  
    const [imageHeight, setImageHeight] = useState(200);  

    const [anchoImagenInicial, setAnchoImagenInicial]= useState(0)
    const [alturaImagenInicial, setAlturaImagenInicial]= useState(0)
    

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
        setImageHeight(200)
        setImageWidth(200)
        setAlturaImagenInicial(data.alto)
        setAnchoImagenInicial(data.ancho)
      })
      .catch((error) => {
        setMessage("Error al cargar los detalles del disenio.");
        setVisible(true);
      });

      fetch(`/api/kubico/disenios/${id}/modulos`)
            .then((response)=> response.json())
            .then((data)=>{
              setListaModulos(data)
             
            })
            .catch((error) => {
              setMessage("Error al cargar los modulos del disenio.");
              setVisible(true);
            });

  };

  
  function encargarDisenio (event) {
    event.preventDefault();
    const updatedDisenio = {
        ...disenioDetalles,
        
        
    };

    handleSave(event)
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


 async function handleSubmitDisenioNuevo(event) {
    event.preventDefault();
    const updatedDisenio = {
        ...disenioNuevo
        
        
    };

  

   
    fetch(`/api/kubico/diseniosNuevo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDisenio),
    })
    .then((response) => response.json())
    .then((data) => {
        setBorrarTrigger((prev)=> prev+1)
        
  
        setCrearNuevoDisenio(false)
        setDisenioNuevo({})
        setFotoGenerica("")
        setDisenioDetalles(data);
        setMostrarDatosDisenio(true);
        setImageHeight(200)
        setImageWidth(200)
        setAlturaImagenInicial(data.alto)
        setAnchoImagenInicial(data.ancho)
       
    })
  
    .catch((error) => alert(error.message));
  }


  function handleSubmitModulos(event) {
    
    event.preventDefault();
    const updatedListaModulos= Object.values(listaModulos);
    console.log(updatedListaModulos)
    fetch(`/api/kubico/disenios/${disenioDetalles.id}/modulos`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedListaModulos),
    })
    .then((response) => response.text())
    .then((data) => {
        setBorrarTrigger((prev)=> prev+1)
        setDisenioDetalles(null)
        setMostrarDatosDisenio(false)
        setMostrarNuevoModulo(false)
    })
    .catch((error) => alert(error.message));
  }

  function deleteModulo(indiceModulo){
    let listaModulosNueva = listaModulos
    listaModulosNueva.pop(indiceModulo)
    setListaModulos(listaModulosNueva)
    setBorrarTrigger((prev)=> prev+1)
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    if(name ==="alto" &&!isNaN(value)){
      const valor = parseFloat(value)
      setImageHeight((prev)=> {
        if(isNaN(valor)){
          setAlturaImagenInicial(0)
          return prev =200
        }else{
          if(valor > alturaImagenInicial){
            setAlturaImagenInicial(valor)
            return prev + 15
          } else{
            setAlturaImagenInicial(valor)
            return prev - 15
          }
          
        }
        
      })
      
    }
    if(name ==="ancho" && !isNaN(value)){
      const valor = parseFloat(value)
      setImageWidth((prev)=> {
        if(isNaN(valor)){
          setAnchoImagenInicial(0)
          return prev =200
        }else{
          if(valor > anchoImagenInicial){
            setAnchoImagenInicial(valor)
            return prev + 15
          } else{
            setAnchoImagenInicial(valor)
            return prev - 15
          }
          
        }
        
      })
      
    }
    
    setDisenioDetalles({ ...disenioDetalles, [name]: value });
  }
  function handleChangeNuevo(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    if(name ==="alto" &&!isNaN(value)){
      const valor = parseFloat(value)
      setImageHeight((prev)=> {
        if(isNaN(valor)){
          setAlturaImagenInicial(0)
          return prev =200
        }else{
          if(valor > alturaImagenInicial){
            setAlturaImagenInicial(valor)
            return prev + 15
          } else{
            setAlturaImagenInicial(valor)
            return prev - 15
          }
          
        }
        
      })
      
    }
    if(name ==="ancho" && !isNaN(value)){
      const valor = parseFloat(value)
      setImageWidth((prev)=> {
        if(isNaN(valor)){
          setAnchoImagenInicial(0)
          return prev =200
        }else{
          if(valor > anchoImagenInicial){
            setAnchoImagenInicial(valor)
            return prev + 15
          } else{
            setAnchoImagenInicial(valor)
            return prev - 15
          }
          
        }
        
      })
      
    }
    
    if(name === "tipo"){
      if(value==="ARMARIO"){
        setFotoGenerica(fotoArmario)
      } else if( value === "VESTIDOR"){
        setFotoGenerica(fotoVestidor)
      } else if(value==="FRENTE"){
        setFotoGenerica(fotoPuerta)
      }
    }

    setDisenioNuevo({ ...disenioNuevo, [name]: value });
  }

  function handleChangeModulo(event, index) {
    const { name, value } = event.target;
    const updatedModulos = [...listaModulos];
    updatedModulos[index] = { ...updatedModulos[index], [name]: value };
    setListaModulos(updatedModulos);
  }

  
  function handleSave(event) {
    event.preventDefault();
    handleSubmit(event); 
    handleSubmitModulos(event); 
  }

  function handleChangeNuevoModulo(event) {
    const { name, value } = event.target;
    setNuevoModulo((prevModulo) => ({
      ...prevModulo,
      [name]: value
    }));
  }

  function guardarModuloNuevo(){
    const modulos = [...listaModulos]
    modulos.push(nuevoModulo)
    setListaModulos(modulos)

  }

  function crearNuevoModulo () {
    

    return (<div>
      <p>Módulo nº {listaModulos.length +1}      </p>
      <Button color="danger" style={{ marginRight: "10px", marginLeft:"10px" }} onClick={()=>{setNuevoModulo({})
                                                                                              setMostrarNuevoModulo(false)}}>
                          Borrar módulo
                        </Button>
                        
<div className="custom-form-input">  
              <Label for="alto" className="custom-form-input-label">Alto del modulo</Label>
              <Input
                type="text"
                name="alto"
                id="alto"
                value={nuevoModulo.alto || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="ancho" className="custom-form-input-label">Ancho del modulo</Label>
              <Input
                type="text"
                name="ancho"
                id="ancho"
                value={nuevoModulo.ancho || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="fondo" className="custom-form-input-label">Fondo del modulo</Label>
              <Input
                type="text"
                name="fondo"
                id="fondo"
                value={nuevoModulo.fondo || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="iluminacion" className="custom-form-input-label">Tipo de iluminacion</Label>
              <Input
                type="text"
                name="iluminacion"
                id="iluminacion"
                value={nuevoModulo.iluminacion || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="pantalonero" className="custom-form-input-label">Tipo de pantalonero </Label>
              <Input
                type="text"
                name="pantalonero"
                id="pantalonero"
                value={nuevoModulo.pantalonero || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="zapatero" className="custom-form-input-label">Tipo de zapatero </Label>
              <Input
                type="text"
                name="zapatero"
                id="zapatero"
                value={nuevoModulo.zapatero || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="tipoMaterial" className="custom-form-input-label">Tipo de material</Label>
              <Input
                type="text"
                name="tipoMaterial"
                id="tipoMaterial"
                value={nuevoModulo.tipoMaterial || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-form-input">  
              <Label for="numCajoneras" className="custom-form-input-label">Numero de cajoneras</Label>
              <Input
                type="text"
                name="numCajoneras"
                id="numCajoneras"
                value={nuevoModulo.numCajoneras || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
         <div className="custom-form-input">  
              <Label for="alturaBalda" className="custom-form-input-label">Altura de la balda</Label>
              <Input
                type="text"
                name="alturaBalda"
                id="alturaBalda"
                value={nuevoModulo.alturaBalda || ""}
                onChange={handleChangeNuevoModulo}
                className="custom-input"
              />
            </div>
            <div className="custom-button-row">
                <button className="auth-button" onClick={()=> {guardarModuloNuevo()
                  setNuevoModulo({})
                  setMostrarNuevoModulo(false)
                }}>Guardar modulo nuevo</button>
              </div>
            
            </div>
            )
  }


  return (
    
    <div style={{ backgroundImage: '', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
      {console.log(disenioNuevo)}
      
      <div className="auth-page-container">
        {modal}

        {/* Botón de cerrar para volver a home */}
        <div style={{right: '10px', top: '80px', position: 'absolute'}}>
          <button onClick={goHome} className="close-button">X</button>
        </div>

        {/* Tabla de disenios */}
        {!mostrarDatosDisenio && !crearNuevoDisenio && (
  <div style={{ marginTop: '20px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', width: '600px', height: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
      <h3 style={{ margin: 0, color: '#343a40' }}>Lista de Diseños</h3>
      <Button color="success" onClick={() => { setCrearNuevoDisenio(true); setListaModulos([]); setNuevoModulo({});
    setImageHeight(200)
    setImageWidth(200)
    setAlturaImagenInicial(0)
    setAnchoImagenInicial(0) }}>
        Crear Nuevo Diseño
      </Button>
    </div>

    {disenios.length > 0 ? (
      <Table responsive bordered hover style={{ backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden', border: '2px solid #28a745' }}>
        <thead style={{ backgroundColor: '#28a745', color: 'white' }}>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Fecha Estimada</th>
            <th>Precio Estimado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {disenios.map((disenio, index) => (
            <tr key={disenio.id} style={{ textAlign: 'center', backgroundColor: index === 0 ? '#d4edda' : 'white', borderBottom: '1px solid #28a745' }}>
              <td>{disenio.nombre}</td>
              <td>{disenio.tipo}</td>
              <td>{new Date(disenio.fechaEstimada).toLocaleDateString()}</td>
              <td>{disenio.precioEstimado}</td>
              <td>
                <Button color="success" onClick={() => verDetallesDisenio(disenio.id)}>
                  Ver Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p style={{ textAlign: 'center', color: '#6c757d' }}>No hay diseños disponibles.</p>
    )}
  </div>
)}






















        {/* Modal de detalles del disenio */}
{mostrarDatosDisenio && disenioDetalles && !crearNuevoDisenio && (
  <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '100%', maxWidth: '1200px' }}>
    <h5>Nombre: {disenioDetalles.nombre}</h5>

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* Sección de Módulos (Izquierda) */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h5>Lista de módulos</h5>
        <Button 
          style={{ 
            backgroundColor: '#a0c4e9',  // Azul más suave
            borderColor: '#7ea9d1',        // Bordes más suaves
            color: '#fff', 
            borderRadius: '20px',
            transition: 'background-color 0.3s ease'
          }} 
          onClick={toggleModulosDropdown}>
          {modulosDropdownOpen ? "Ocultar módulos" : "Mostrar módulos"}
        </Button>
        <Button 
          color="success" 
          style={{ marginLeft: "10px", borderRadius: '20px' }} 
          onClick={() => setMostrarNuevoModulo(true)}>
          Añadir módulo
        </Button>
        <Collapse isOpen={modulosDropdownOpen}>
          {listaModulos.length > 0 ? (
            listaModulos.map((modulo, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>Módulo nº {index + 1}</p>
                  <Button 
                    color="danger" 
                    style={{ marginRight: "10px", marginLeft: "10px" }} 
                    onClick={() => deleteModulo(index)}>
                    Borrar módulo
                  </Button>
                </div>

                {modulo.alto && <div className="custom-form-input">
                  <Label for="alto" className="custom-form-input-label">Alto del modulo</Label>
                  <Input
                    type="text"
                    name="alto"
                    id="alto"
                    value={modulo.alto || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.ancho && <div className="custom-form-input">
                  <Label for="ancho" className="custom-form-input-label">Ancho del modulo</Label>
                  <Input
                    type="text"
                    name="ancho"
                    id="ancho"
                    value={modulo.ancho || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.fondo && <div className="custom-form-input">
                  <Label for="fondo" className="custom-form-input-label">Fondo del modulo</Label>
                  <Input
                    type="text"
                    name="fondo"
                    id="fondo"
                    value={modulo.fondo || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.iluminacion && <div className="custom-form-input">
                  <Label for="iluminacion" className="custom-form-input-label">Tipo de iluminacion</Label>
                  <Input
                    type="text"
                    name="iluminacion"
                    id="iluminacion"
                    value={modulo.iluminacion || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.pantalonero && <div className="custom-form-input">
                  <Label for="pantalonero" className="custom-form-input-label">Tipo de pantalonero</Label>
                  <Input
                    type="text"
                    name="pantalonero"
                    id="pantalonero"
                    value={modulo.pantalonero || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.zapatero && <div className="custom-form-input">
                  <Label for="zapatero" className="custom-form-input-label">Tipo de zapatero</Label>
                  <Input
                    type="text"
                    name="zapatero"
                    id="zapatero"
                    value={modulo.zapatero || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.tipoMaterial && <div className="custom-form-input">
                  <Label for="tipoMaterial" className="custom-form-input-label">Tipo de material</Label>
                  <Input
                    type="text"
                    name="tipoMaterial"
                    id="tipoMaterial"
                    value={modulo.tipoMaterial || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.numCajoneras && <div className="custom-form-input">
                  <Label for="numCajoneras" className="custom-form-input-label">Numero de cajoneras</Label>
                  <Input
                    type="text"
                    name="numCajoneras"
                    id="numCajoneras"
                    value={modulo.numCajoneras || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
                {modulo.alturaBalda && <div className="custom-form-input">
                  <Label for="alturaBalda" className="custom-form-input-label">Altura de la balda</Label>
                  <Input
                    type="text"
                    name="alturaBalda"
                    id="alturaBalda"
                    value={modulo.alturaBalda || ""}
                    onChange={(event) => handleChangeModulo(event, index)}
                    className="custom-input"
                  />
                </div>}
              </div>
            ))
          ) : (
            <p>No hay módulos en este diseño</p>
          )}
          {mostrarNuevoModulo && crearNuevoModulo()}
        </Collapse>
      </div>

      {/* Sección de Foto (Centro) */}
      <div style={{ flex: 1, textAlign: 'center', marginRight: '60px' }}>
        {disenioDetalles ? (
          <img
            src={disenioDetalles.foto}
            alt="Foto del diseño"
            style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, maxHeight: '400px', maxWidth: '400px', objectFit: "fill", transition: 'all 0.3s ease-in-out', marginRight: '20px' }}
            onError={(e) => (e.target.style.display = 'none')}
          />
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      {/* Sección del Resto de los Detalles (Derecha) */}
      <div style={{ flex: 1 }}>
        <p><strong>Precio Estimado:</strong> {disenioDetalles.precioEstimado}€</p>
        <p><strong>Fecha Estimada:</strong> {new Date(disenioDetalles.fechaEstimada).toLocaleDateString()}</p>
        <p><strong>Tipo de mueble:</strong> {disenioDetalles.tipo}</p>

        <Form onSubmit={handleSave}>
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
            <Label for="numPuertas" className="custom-form-input-label">Número de puertas</Label>
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

        <div>
          <Button color="success" onClick={(event) => encargarDisenio(event)}>Encargar</Button>
          <Button color="danger" onClick={() => handleDeleteDisenio(disenioDetalles.id)}>Borrar diseño</Button>
        </div>

        <button color="secondary" onClick={cerrarModal}>Cerrar</button>
      </div>
    </div>
  </div>
)}
























{crearNuevoDisenio && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
      }}
    >
      <h5>Nuevo Diseño</h5>

      <p><strong>Precio Estimado:</strong> 208.90€</p>
      <p><strong>Fecha Estimada:</strong> {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>

      <div className="custom-form-input">
        <Label for="nombre" className="custom-form-input-label">Nombre para el diseño</Label>
        <Input
          type="text"
          name="nombre"
          id="nombre"
          value={disenioNuevo.nombre || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        />
      </div>

      <div className="custom-form-input">
        <Label for="tipo" className="custom-form-input-label">Tipo de mueble</Label>
        <Input
          type="select"
          name="tipo"
          id="tipo"
          value={disenioNuevo.tipo || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        >
          <option value="" disabled>Selecciona un tipo de mueble</option>
          {tiposDeMueble.map((tipo) => (
            <option key={tipo} value={tipo.toUpperCase()}>
              {tipo}
            </option>
          ))}
        </Input>
      </div>

      <div className="custom-form-input">
        <Label for="alto" className="custom-form-input-label">Alto</Label>
        <Input
          type="text"
          name="alto"
          id="alto"
          value={disenioNuevo.alto || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        />
      </div>

      <div className="custom-form-input">
        <Label for="ancho" className="custom-form-input-label">Ancho</Label>
        <Input
          type="text"
          name="ancho"
          id="ancho"
          value={disenioNuevo.ancho || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        />
      </div>

      <div className="custom-form-input">
        <Label for="fondo" className="custom-form-input-label">Fondo</Label>
        <Input
          type="text"
          name="fondo"
          id="fondo"
          value={disenioNuevo.fondo || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        />
      </div>

      <div className="custom-form-input">
        <Label for="tipoPuerta" className="custom-form-input-label">Tipo puerta</Label>
        <Input
          type="text"
          name="tipoPuerta"
          id="tipoPuerta"
          value={disenioNuevo.tipoPuerta || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        />
      </div>

      <div className="custom-form-input">
        <Label for="numPuertas" className="custom-form-input-label">Número de puertas</Label>
        <Input
          type="text"
          name="numPuertas"
          id="numPuertas"
          value={disenioNuevo.numPuertas || ""}
          onChange={handleChangeNuevo}
          className="custom-input"
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center', marginRight: '60px' }}>
        {disenioNuevo && disenioNuevo.tipo ? (
          <img
            src={fotoGenerica}
            alt="Foto del diseño"
            style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, maxHeight: '400px', maxWidth: '400px', objectFit: 'fill', transition: 'all 0.3s ease-in-out', marginRight: '20px' }}
            onError={(e) => (e.target.style.display = 'none')}
          />
        ) : (
          <p>Seleccione primero el tipo de mueble para previsualizar la foto...</p>
        )}
      </div>

      <p style={{ marginTop: 20 }}>(Una vez guardado podrá añadirle módulos a su diseño)</p>
      <div className="custom-button-row">
        <Button className="auth-button" onClick={(event) => handleSubmitDisenioNuevo(event)}>Guardar cambios</Button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
