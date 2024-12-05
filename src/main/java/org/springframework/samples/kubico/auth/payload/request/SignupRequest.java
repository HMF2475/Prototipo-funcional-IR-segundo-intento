package org.springframework.samples.kubico.auth.payload.request;


import jakarta.validation.constraints.NotBlank;


import org.springframework.samples.kubico.utilidades.Sexo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
	
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
	
	//IR

	
	private String direccion;

	
	private String telefono;
	

    private Sexo sexo;

}