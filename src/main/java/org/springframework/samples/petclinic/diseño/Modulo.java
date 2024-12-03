package org.springframework.samples.petclinic.diseño;
import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "modulos")
@Getter
@Setter
public class Modulo extends BaseEntity {
    Double ancho;
    Double alto;
    Double fondo;
    String iluminacion;
    String pantalonero;
    String zapatero;
    String tipoMaterial;
    Integer numCajoneras;
    Integer numBaldas;

    @ManyToOne
    Integer diseño;
}
