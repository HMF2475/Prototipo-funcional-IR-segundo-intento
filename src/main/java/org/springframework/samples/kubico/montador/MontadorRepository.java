package org.springframework.samples.kubico.montador;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MontadorRepository extends CrudRepository<Montador, Integer> {

    @Query("SELECT DISTINCT montador FROM Montadores montador WHERE montador.user.id = :userId")
	public Optional<Montador> findByUser(int userId);


}
