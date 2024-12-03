package org.springframework.samples.petclinic.diseño;

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Diseño extends BaseEntity{
    String tipo;
    String tipoPuerta;
    String observaciones;
    Integer numPuertas;
    Double alto;
    Double ancho;
    Double fondo;
    String nombre;
    
}
