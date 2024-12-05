package org.springframework.samples.kubico.diseño;
import org.springframework.samples.kubico.model.BaseEntity;

import jakarta.persistence.Column;
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

    @Column(name = "tipo_material")
    String tipoMaterial;

    @Column(name = "num_cajoneras")
    Integer numCajoneras;

    @Column(name = "num_baldas")
    Integer numBaldas;

    @ManyToOne
    Disenio disenio;
}
