import React, { useState, useEffect } from "react";
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";
import { Table,  Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const jwt = tokenService.getLocalAccessToken();

export default function Profile() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mostrarDatosPedido, setMostrarDatosPedido] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [pedidoDetalles, setPedidoDetalles] = useState(null);
  const [aprobarTrigger, setAprobarTrigger] = useState(0)
  const [pedidos, setPedidos] = useFetchState(
    {}, "/api/kubico/pedidos", jwt, setMessage, setVisible
  );


  useEffect(() => {
    let intervalId;

    function fetchPedidos() {
        
        fetch(
            '/api/kubico/pedidos',
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setPedidos(data);
                
            })
    }
    fetchPedidos();

    intervalId = setInterval(fetchPedidos, 1000);
    
    return () => clearInterval(intervalId)
},[aprobarTrigger, pedidoId])


  const modal = getErrorModal(setVisible, visible, message);
  const navigate = useNavigate();


  const goHome = () => {
    navigate("/");
  };

  const verDetallesPedido = (id) => {
    setPedidoId(id);
    fetch(`/api/kubico/pedidos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPedidoDetalles(data);
        setMostrarDatosPedido(true);
      })
      .catch((error) => {
        setMessage("Error al cargar los detalles del pedido.");
        setVisible(true);
      });
  };

  
  const aprobarPedido = (id, accion) => {
    fetch(`/api/kubico/pedidos/${id}?accion=${accion}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let mensaje;
        if(accion === "si"){
          mensaje = "aprobado"
        }else {
          mensaje="rechazado"
        }

        setMessage("Pedido " + mensaje);
        setVisible(true);
        setMostrarDatosPedido(false); 
        setAprobarTrigger((anterior)=> anterior+1)
      })
      .catch(error => {
        let mensaje;
        if(accion === "si"){
          mensaje = "aprobar"
        }else {
          mensaje="rechazar"
        }
        setMessage("Error al " + mensaje + " el pedido.");
        setVisible(true);
      });
  };



  const cerrarModal = () => {
    setMostrarDatosPedido(false);
    setPedidoDetalles(null);
  };

  return (
    <div style={{ backgroundImage: '', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
      <div className="auth-page-container">
        {modal}
        {!mostrarDatosPedido && (
          <div style={{ backgroundColor: 'white', borderRadius: '10px', width: '600px', height: '800px' }}>
            <h3>Lista de Pedidos</h3>
            {pedidos.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Cliente</th>
                    <th>Fecha del Pedido</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.referencia}</td>
                      <td>{pedido.cliente ? pedido.cliente.firstName + ' ' + pedido.cliente.lastName : 'Desconocido'}</td>
                      <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                      <td>{pedido.estado}</td>
                      <td>
                        <Button color="primary" onClick={() => verDetallesPedido(pedido.id)}>
                          Ver Detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No hay pedidos disponibles.</p>
            )}
          </div>
        )}

        {mostrarDatosPedido && pedidoDetalles && (
          <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width:'600px', height:'800px' }}>
            <h5>Referencia: {pedidoDetalles.referencia}</h5>
            <p><strong>Precio:</strong> {pedidoDetalles.precio}€</p>
            <p><strong>Fecha Estimada:</strong> {new Date(pedidoDetalles.fechaEstimada).toLocaleDateString()}</p>
            <p><strong>Fecha de Pedido:</strong> {new Date(pedidoDetalles.fechaPedido).toLocaleDateString()}</p>
            <p><strong>Fecha de Pago:</strong> {pedidoDetalles.fechaPago ? new Date(pedidoDetalles.fechaPago).toLocaleDateString() : "No pagado aún"}</p>
            <p><strong>Estado:</strong> {pedidoDetalles.estado}</p>

            <h6>Cliente:</h6>
            <p>{pedidoDetalles.cliente ? pedidoDetalles.cliente.firstName + ' ' + pedidoDetalles.cliente.lastName : 'Hubo algún error cargando el cliente'}</p>

            <h6>Diseño:</h6>
            {pedidoDetalles.disenio ? (
              <img src={pedidoDetalles.disenio.foto}
                alt="Foto del diseño"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                onError={(e) => (e.target.style.display = 'none')}
              />
            ) : (
              <p>Cargando...</p>
            )}

            {pedidoDetalles.estado === "EN_REVISION" && (
              <div>
                <Button color="success" onClick={() => aprobarPedido(pedidoDetalles.id, "si")}>Aprobar</Button>
                <Button color="danger" onClick={() => aprobarPedido(pedidoDetalles.id, "no")}>Desaprobar</Button>
              </div>
            )}

            <button color="secondary" onClick={cerrarModal}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}
