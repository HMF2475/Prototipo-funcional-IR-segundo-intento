import React, { useState, useEffect } from "react";
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../SmallChat/ChatComponent";
import { RiQuestionnaireLine } from "react-icons/ri";

const jwt = tokenService.getLocalAccessToken();

export default function Profile() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mostrarDatosPedido, setMostrarDatosPedido] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [pedidoDetalles, setPedidoDetalles] = useState(null);
  const [viewChat, setViewChat] = useState(false);

  const [pedidos, setPedidos] = useFetchState(
    {}, "/api/kubico/pedidos", jwt, setMessage, setVisible
  );

  const modal = getErrorModal(setVisible, visible, message);



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
  }, [pedidoId, setPedidos])


  const cerrarModal = () => {
    setMostrarDatosPedido(false);
    setPedidoDetalles(null);
  };

  return (
    <div style={{ backgroundImage: '', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
      <div className="auth-page-container">
        {modal}
        {!mostrarDatosPedido && (
          <div style={{ marginTop: '20px', backgroundColor: '#4d5650', padding: '20px', borderRadius: '10px', width: '900px', height: '800px' }}>
            <h3 style={{ color: '#ffffff' }}>Lista de Pedidos</h3>
            {pedidos.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Interiorista</th>
                    <th>Montador</th>
                    <th>Fecha del Pedido</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.referencia}</td>
                      <td>{pedido.interiorista ? pedido.interiorista.firstName + ' ' + pedido.interiorista.lastName : 'Desconocido'}</td>
                      <td>{pedido.montador ? pedido.montador.firstName + ' ' + pedido.montador.lastName : 'No aplica'}</td>
                      <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                      <td>{pedido.estado}</td>
                      <td>
                        <Button color="primary" onClick={() => verDetallesPedido(pedido.id)}>
                          Ver Detalles
                        </Button>
                      </td>
                      <td>
                        <RiQuestionnaireLine
                          size={30}
                          style={{ color: 'red' }}
                          onClick={() => setViewChat(true)} />
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
          <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '600px', height: '800px' }}>

            <h5>Referencia: {pedidoDetalles.referencia}</h5>
            <p><strong>Precio:</strong> {pedidoDetalles.precio}€</p>
            <p><strong>Fecha Estimada:</strong> {new Date(pedidoDetalles.fechaEstimada).toLocaleDateString()}</p>
            <p><strong>Fecha de Pedido:</strong> {new Date(pedidoDetalles.fechaPedido).toLocaleDateString()}</p>
            <p><strong>Fecha de Pago:</strong> {pedidoDetalles.fechaPago ? new Date(pedidoDetalles.fechaPago).toLocaleDateString() : "No pagado aún"}</p>
            <p><strong>Estado:</strong> {pedidoDetalles.estado}</p>

            <h6>Interiorista:</h6>
            <p>{pedidoDetalles.interiorista ? pedidoDetalles.interiorista.firstName + ' ' + pedidoDetalles.interiorista.lastName : 'Hubo algún error cargando el cliente'}</p>

            <h6>Montador:</h6>
            <p>{pedidoDetalles.montador ? pedidoDetalles.montador.firstName + ' ' + pedidoDetalles.montador.lastName : 'No aplica'}</p>

            <h6>Diseño:</h6>
            {pedidoDetalles.disenio ? (
              <img src={pedidoDetalles.disenio.foto}
                alt="Foto del diseño"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                onError={(e) => (e.target.style.display = 'none')} />
            ) : (
              <p>Cargando...</p>
            )}
            <button color="secondary" onClick={cerrarModal}>Cerrar</button>

          </div>
        )}
        {!mostrarDatosPedido && !pedidoDetalles && viewChat &&
          <div style={{ position: 'fixed', right: '0', bottom: '20px', zIndex: '1000' }}>
            <ChatComponent closeChat={() => setViewChat(false)} />
          </div>}
      </div>
    </div>
  );
}
