package org.springframework.samples.kubico.diseño;



import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface DisenioRepository extends CrudRepository<Disenio, Integer> {

    List<Disenio> findByClienteId(Integer clienteId);

    @Query("SELECT m FROM Modulo m WHERE m.disenio LIKE ?1")
    List<Modulo> findAllModulosByDisenioId(Integer disenio_id);
}
