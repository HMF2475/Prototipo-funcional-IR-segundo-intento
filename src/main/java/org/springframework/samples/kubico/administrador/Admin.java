package org.springframework.samples.kubico.administrador;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.samples.kubico.model.Person;
import org.springframework.samples.kubico.user.User;
import org.springframework.samples.kubico.utilidades.Sexo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "admins")
public class Admin extends Person {
    
    
	@Column(name = "direccion")
	@NotEmpty
	private String direccion;

	@Column(name = "telefono")
	@NotEmpty
	@Digits(fraction = 0, integer = 10)
	private String telefono;

	@Column(name = "second_name")
	private String second_name;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @OneToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User user;
}
