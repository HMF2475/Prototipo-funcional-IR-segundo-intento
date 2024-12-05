package org.springframework.samples.kubico.interiorista;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface InterioristaRepository extends CrudRepository<Interiorista, Integer> {

    @Query("SELECT DISTINCT interiorista FROM Interioristas interiorista WHERE interiorista.user.id = :userId")
	public Optional<Interiorista> findByUser(int userId);


}
