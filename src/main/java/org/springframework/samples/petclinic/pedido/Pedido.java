package org.springframework.samples.petclinic.pedido;

import java.time.LocalDate;

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Pedido  extends BaseEntity{
    Double precio;
    Integer cliente;
    Integer interiorista;
    Integer idDiseño;
    LocalDate fechaEstimada;
    LocalDate fechaPedido;
    LocalDate fechaPago;
    String estado;

    
}
