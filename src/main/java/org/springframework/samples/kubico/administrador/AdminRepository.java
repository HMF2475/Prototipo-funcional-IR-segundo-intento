package org.springframework.samples.kubico.administrador;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface AdminRepository extends CrudRepository<Admin, Integer> {
    @Query("SELECT DISTINCT admin FROM Admins admin WHERE admin.user.id = :userId")
	public Optional<Admin> findByUser(int userId);



}
