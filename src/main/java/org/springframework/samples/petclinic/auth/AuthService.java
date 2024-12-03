package org.springframework.samples.petclinic.auth;

import java.util.ArrayList;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.IR.ServiceDeKubico;
import org.springframework.samples.petclinic.IR.administrador.Admin;
import org.springframework.samples.petclinic.IR.cliente.Cliente;
import org.springframework.samples.petclinic.IR.interiorista.Interiorista;
import org.springframework.samples.petclinic.IR.montador.Montador;
import org.springframework.samples.petclinic.auth.payload.request.SignupRequest;
import org.springframework.samples.petclinic.clinic.ClinicService;
import org.springframework.samples.petclinic.clinicowner.ClinicOwner;
import org.springframework.samples.petclinic.clinicowner.ClinicOwnerService;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.owner.OwnerService;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.samples.petclinic.user.AuthoritiesService;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.samples.petclinic.vet.Specialty;
import org.springframework.samples.petclinic.vet.Vet;
import org.springframework.samples.petclinic.vet.VetService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final PasswordEncoder encoder;
	private final AuthoritiesService authoritiesService;
	private final UserService userService;
	private final OwnerService ownerService;
	private final VetService vetService;
	private final ClinicOwnerService clinicOwnerService;
	private final ClinicService clinicService;
private final ServiceDeKubico serviceDeKubico;
	@Autowired
	public AuthService(PasswordEncoder encoder, AuthoritiesService authoritiesService, UserService userService,
			OwnerService ownerService, VetService vetService, ClinicOwnerService clinicOwnerService, ClinicService clinicService, ServiceDeKubico serviceDeKubico) {
		this.encoder = encoder;
		this.authoritiesService = authoritiesService;
		this.userService = userService;
		this.ownerService = ownerService;
		this.vetService = vetService;
		this.clinicOwnerService = clinicOwnerService;
		this.clinicService = clinicService;
		this.serviceDeKubico = serviceDeKubico;
	}

	@Transactional
	public void createUser(@Valid SignupRequest request) {
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(encoder.encode(request.getPassword()));
		String strRoles = request.getAuthority();
		Authorities role;

		switch (strRoles.toLowerCase()) {
		case "admin":
			role = authoritiesService.findByAuthority("ADMIN");
			user.setAuthority(role);
			userService.saveUser(user);
			Admin admin = new Admin();
			admin.setFirstName(request.getFirstName());
			admin.setSecond_name(request.getSecond_name());
			admin.setLastName(request.getLastName());
			admin.setDireccion(request.getDireccion());
			admin.setTelefono(request.getTelefono());
			admin.setSexo(request.getSexo());
			// FALTARIA LLAMAR AL SERVICE Y QUE LO GUARDE
			break;
		
		case "interiorista":
			role = authoritiesService.findByAuthority("INTERIORISTA");
			user.setAuthority(role);
			userService.saveUser(user);
			Interiorista interiorista = new Interiorista();
			interiorista.setFirstName(request.getFirstName());
			interiorista.setSecond_name(request.getSecond_name());
			interiorista.setLastName(request.getLastName());
			interiorista.setDireccion(request.getDireccion());
			interiorista.setTelefono(request.getTelefono());
			interiorista.setSexo(request.getSexo());
			//SERVICE DEL INTERIORISTA
			break;
		
		case "cliente":
			role = authoritiesService.findByAuthority("CLIENTE");
			user.setAuthority(role);
			userService.saveUser(user);
			Cliente cliente = new Cliente();
			cliente.setFirstName(request.getFirstName());
			cliente.setSecond_name(request.getSecond_name());
			cliente.setLastName(request.getLastName());
			cliente.setDireccion(request.getDireccion());
			cliente.setTelefono(request.getTelefono());
			cliente.setSexo(request.getSexo());
		default:
			role = authoritiesService.findByAuthority("MONTADOR");
			user.setAuthority(role);
			userService.saveUser(user);
			Montador montador = new Montador();
			montador.setFirstName(request.getFirstName());
			montador.setSecond_name(request.getSecond_name());
			montador.setLastName(request.getLastName());
			montador.setDireccion(request.getDireccion());
			montador.setTelefono(request.getTelefono());
			montador.setSexo(request.getSexo());
			
			

		}
	}

}
