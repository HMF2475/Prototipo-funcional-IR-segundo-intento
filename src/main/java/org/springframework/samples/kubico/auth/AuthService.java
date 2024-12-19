package org.springframework.samples.kubico.auth;


import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.kubico.utilidades.ServiceDeKubico;
import org.springframework.samples.kubico.administrador.Admin;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.interiorista.Interiorista;
import org.springframework.samples.kubico.montador.Montador;
import org.springframework.samples.kubico.auth.payload.request.SignupRequest;


import org.springframework.samples.kubico.user.Authorities;
import org.springframework.samples.kubico.user.AuthoritiesService;
import org.springframework.samples.kubico.user.User;
import org.springframework.samples.kubico.user.UserService;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final PasswordEncoder encoder;
	private final AuthoritiesService authoritiesService;
	private final UserService userService;

private final ServiceDeKubico serviceDeKubico;
	@Autowired
	public AuthService(PasswordEncoder encoder, AuthoritiesService authoritiesService, UserService userService,
			 ServiceDeKubico serviceDeKubico) {
		this.encoder = encoder;
		this.authoritiesService = authoritiesService;
		this.userService = userService;

		this.serviceDeKubico = serviceDeKubico;
	}

	@Transactional
	public void createUser(SignupRequest request) {
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
			serviceDeKubico.saveAdmin(admin);
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
			serviceDeKubico.saveInteriorista(interiorista);
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
			serviceDeKubico.saveCliente(cliente);
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
			serviceDeKubico.saveMontador(montador);
			
			

		}
	}

}