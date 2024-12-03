package org.springframework.samples.petclinic.IR;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.IR.administrador.AdminRepository;
import org.springframework.samples.petclinic.IR.cliente.ClienteRepository;
import org.springframework.samples.petclinic.IR.interiorista.InterioristaRepository;
import org.springframework.samples.petclinic.IR.montador.MontadorRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceDeKubico {
    
    AdminRepository adminRepository;
    ClienteRepository clienteRepository;
    InterioristaRepository interioristaRepository;
    MontadorRepository montadorRepository;

    @Autowired
    public ServiceDeKubico(
        AdminRepository adminRepository,
        ClienteRepository clienteRepository,
        InterioristaRepository interioristaRepository,
        MontadorRepository montadorRepository){
            this.adminRepository =adminRepository;
            this.clienteRepository = clienteRepository;
            this.interioristaRepository = interioristaRepository;
            this.montadorRepository = montadorRepository;
        }
}
