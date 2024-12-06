package org.springframework.samples.kubico.pedido;

import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.diseño.Disenio;
import org.springframework.samples.kubico.interiorista.Interiorista;
import org.springframework.samples.kubico.model.BaseEntity;
import org.springframework.samples.kubico.montador.Montador;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Pedido  extends BaseEntity{

    String referencia;
    Double precio;
 

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "disenio_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
    Disenio disenio;

    LocalDate fechaEstimada;
    LocalDate fechaPedido;

    String pagado;
    
    @Enumerated(EnumType.STRING)
    Estado estado;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "cliente_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
    Cliente cliente;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "interiorista_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
    Interiorista interiorista;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "montador_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
    Montador montador;
}
