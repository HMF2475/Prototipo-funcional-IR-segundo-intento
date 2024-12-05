package org.springframework.samples.kubico.utilidades;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.kubico.administrador.AdminRepository;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.cliente.ClienteRepository;
import org.springframework.samples.kubico.interiorista.Interiorista;
import org.springframework.samples.kubico.interiorista.InterioristaRepository;
import org.springframework.samples.kubico.montador.Montador;
import org.springframework.samples.kubico.montador.MontadorRepository;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServiceDeKubico {

    private final AdminRepository adminRepository;
    private final ClienteRepository clienteRepository;
    private final InterioristaRepository interioristaRepository;
    private final MontadorRepository montadorRepository;

    @Autowired
    public ServiceDeKubico(
        AdminRepository adminRepository,
        ClienteRepository clienteRepository,
        InterioristaRepository interioristaRepository,
        MontadorRepository montadorRepository) {
            this.adminRepository = adminRepository;
            this.clienteRepository = clienteRepository;
            this.interioristaRepository = interioristaRepository;
            this.montadorRepository = montadorRepository;
    }

    @Transactional(readOnly = true)
    public Cliente findClienteByUserId(Integer userId) {
        return clienteRepository.findByUser(userId)
            .orElseThrow(() -> new NotFoundException("No se encontró a ese cliente"));
    }
    @Transactional(readOnly = true)
    public List<Cliente> findAllClientes(){
        return (List<Cliente>) clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Interiorista findInterioristaByUserId(Integer userId) {
        return interioristaRepository.findByUser(userId)
            .orElseThrow(() -> new NotFoundException("No se encontró a ese interiorista"));
    }

    @Transactional(readOnly = true)
    public Montador findMontadorByUserId(Integer userId) {
        return montadorRepository.findByUser(userId)
            .orElseThrow(() -> new NotFoundException("No se encontró a ese montador"));
    }

    @Transactional(readOnly = true)
    public List<Montador> findAllMontadores() {
        return (List<Montador>) montadorRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Interiorista> findAllInterioristas() {
        return (List<Interiorista>) interioristaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Object> findAllTrabajadores() {
        List<Object> usuarios = new ArrayList<>();
        usuarios.addAll((List<Interiorista>) interioristaRepository.findAll());
        usuarios.addAll((List<Montador>) montadorRepository.findAll());
        return usuarios;
    }


    @Transactional(readOnly = true)
    public List<Object> findAllUsuarios() {
        List<Object> usuarios = new ArrayList<>();
        usuarios.addAll((List<Cliente>) clienteRepository.findAll());
        usuarios.addAll((List<Interiorista>) interioristaRepository.findAll());
        usuarios.addAll((List<Montador>) montadorRepository.findAll());
        return usuarios;
    }

    @Transactional
    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Guardar Interiorista
    @Transactional
    public Interiorista saveInteriorista(Interiorista interiorista) {
        return interioristaRepository.save(interiorista);
    }

    // Guardar Montador
    @Transactional
    public Montador saveMontador(Montador montador) {
        return montadorRepository.save(montador);
    }
}

