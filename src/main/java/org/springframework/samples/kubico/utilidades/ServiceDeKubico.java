package org.springframework.samples.kubico.utilidades;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.kubico.administrador.AdminRepository;
import org.springframework.samples.kubico.cliente.ClienteRepository;
import org.springframework.samples.kubico.interiorista.InterioristaRepository;
import org.springframework.samples.kubico.montador.MontadorRepository;
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
