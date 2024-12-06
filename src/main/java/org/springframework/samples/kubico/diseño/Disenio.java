package org.springframework.samples.kubico.diseño;

import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.model.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Disenio extends BaseEntity{
    String tipo;
    String tipoPuerta;
    String observaciones;
    Integer numPuertas;
    Double alto;
    Double ancho;
    Double fondo;
    String nombre;
    Double precioEstimado;
    LocalDate fechaEstimada;
    
    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
    @JoinColumn(name = "cliente_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    Cliente cliente;
    
    String foto;
}
