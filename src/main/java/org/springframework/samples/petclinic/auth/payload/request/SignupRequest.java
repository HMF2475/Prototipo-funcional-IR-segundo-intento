package org.springframework.samples.petclinic.auth.payload.request;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.samples.petclinic.IR.Sexo;
import org.springframework.samples.petclinic.clinic.Clinic;

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
