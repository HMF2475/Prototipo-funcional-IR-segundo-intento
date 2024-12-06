package org.springframework.samples.kubico.cliente;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ClienteRepository extends CrudRepository<Cliente, Integer> {
    @Query("SELECT DISTINCT cliente FROM Cliente cliente WHERE cliente.user.id = :userId")
	public Optional<Cliente> findByUser(int userId);


}
