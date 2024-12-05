package org.springframework.samples.kubico.pedido;

import java.time.LocalDate;

import org.springframework.samples.kubico.diseño.Disenio;
import org.springframework.samples.kubico.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Pedido  extends BaseEntity{
    Double precio;
    Integer cliente;
    Integer interiorista;


    @OneToOne
    Disenio disenio;
    LocalDate fechaEstimada;
    LocalDate fechaPedido;
    LocalDate fechaPago;
    String estado;

    
}
