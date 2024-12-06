package org.springframework.samples.kubico.utilidades;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Perfil {
    // User
	@NotBlank
	private String username;
	
	@NotBlank
	private String authority;

	@NotBlank
	private String password;
	
	//Both
	@NotBlank
	private String firstName;
	
	private String second_name;

	@NotBlank
	private String lastName;
	


	
	private String direccion;

	
	private String telefono;
	

    private Sexo sexo;
}
