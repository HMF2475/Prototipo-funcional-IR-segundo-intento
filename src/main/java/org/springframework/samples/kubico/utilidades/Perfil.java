package org.springframework.samples.kubico.utilidades;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Perfil {
	@NotBlank
	private String username;
	
	@NotBlank
	private String authority;

	@NotBlank
	private String password;
	
	@NotBlank
	private String firstName;
	
	private String second_name;

	@NotBlank
	private String lastName;
	


	
	private String direccion;

	
	private String telefono;
	

    private Sexo sexo;
}
