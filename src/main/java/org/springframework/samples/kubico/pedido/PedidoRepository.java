package org.springframework.samples.kubico.pedido;



import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PedidoRepository extends CrudRepository<Pedido, Integer> {

     List<Pedido> findByClienteId(Integer clienteId);

     List<Pedido> findByInterioristaId(Integer interioristaId);
 
     List<Pedido> findByMontadorId(Integer montadorId);
}
