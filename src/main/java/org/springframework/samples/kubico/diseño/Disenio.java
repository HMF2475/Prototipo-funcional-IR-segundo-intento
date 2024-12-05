package org.springframework.samples.kubico.diseño;

import org.springframework.samples.kubico.model.BaseEntity;

import jakarta.persistence.Entity;
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
    
}
