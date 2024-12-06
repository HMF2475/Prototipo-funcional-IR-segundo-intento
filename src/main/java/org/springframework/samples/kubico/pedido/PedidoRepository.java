package org.springframework.samples.kubico.pedido;



import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PedidoRepository extends CrudRepository<Pedido, Integer> {

     // Buscar pedidos por cliente ID
     List<Pedido> findByClienteId(Integer clienteId);

     // Buscar pedidos por interiorista ID
     List<Pedido> findByInterioristaId(Integer interioristaId);
 
     // Buscar pedidos por montador ID
     List<Pedido> findByMontadorId(Integer montadorId);
}
