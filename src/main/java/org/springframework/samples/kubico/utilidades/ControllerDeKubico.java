package org.springframework.samples.kubico.utilidades;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.interiorista.Interiorista;
import org.springframework.samples.kubico.montador.Montador;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kubico")
public class ControllerDeKubico {

    private final ServiceDeKubico serviceDeKubico;

    @Autowired
    public ControllerDeKubico(ServiceDeKubico serviceDeKubico) {
        this.serviceDeKubico = serviceDeKubico;
    }

    @PostMapping("/usuarios/crear")
    public ResponseEntity<?> createUser(@RequestBody Object usuario, @RequestParam String rol) {
        try {
            switch (rol.toLowerCase()) {
                case "cliente":
                    if (usuario instanceof Cliente cliente) {
                        Cliente savedCliente = serviceDeKubico.saveCliente(cliente);
                        return new ResponseEntity<>(savedCliente, HttpStatus.CREATED);
                    }
                    break;
                case "interiorista":
                    if (usuario instanceof Interiorista interiorista) {
                        Interiorista savedInteriorista = serviceDeKubico.saveInteriorista(interiorista);
                        return new ResponseEntity<>(savedInteriorista, HttpStatus.CREATED);
                    }
                    break;
                case "montador":
                    if (usuario instanceof Montador montador) {
                        Montador savedMontador = serviceDeKubico.saveMontador(montador);
                        return new ResponseEntity<>(savedMontador, HttpStatus.CREATED);
                    }
                    break;
                default:
                    return new ResponseEntity<>("Rol no reconocido", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("El objeto no coincide con el rol indicado", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/clientes/{userId}")
    public ResponseEntity<Cliente> getClienteByUserId(@PathVariable Integer userId) {
        Cliente cliente = serviceDeKubico.findClienteByUserId(userId);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    // Obtener todos los clientes
    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> getAllClientes() {
        List<Cliente> clientes = serviceDeKubico.findAllClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    // Obtener interiorista por userId
    @GetMapping("/interioristas/{userId}")
    public ResponseEntity<Interiorista> getInterioristaByUserId(@PathVariable Integer userId) {
        Interiorista interiorista = serviceDeKubico.findInterioristaByUserId(userId);
        return new ResponseEntity<>(interiorista, HttpStatus.OK);
    }

    // Obtener todos los interioristas
    @GetMapping("/interioristas")
    public ResponseEntity<List<Interiorista>> getAllInterioristas() {
        List<Interiorista> interioristas = serviceDeKubico.findAllInterioristas();
        return new ResponseEntity<>(interioristas, HttpStatus.OK);
    }

    // Obtener montador por userId
    @GetMapping("/montadores/{userId}")
    public ResponseEntity<Montador> getMontadorByUserId(@PathVariable Integer userId) {
        Montador montador = serviceDeKubico.findMontadorByUserId(userId);
        return new ResponseEntity<>(montador, HttpStatus.OK);
    }

    // Obtener todos los montadores
    @GetMapping("/montadores")
    public ResponseEntity<List<Montador>> getAllMontadores() {
        List<Montador> montadores = serviceDeKubico.findAllMontadores();
        return new ResponseEntity<>(montadores, HttpStatus.OK);
    }

    // Obtener todos los trabajadores (interioristas y montadores)
    @GetMapping("/trabajadores")
    public ResponseEntity<List<Object>> getAllTrabajadores() {
        List<Object> trabajadores = serviceDeKubico.findAllTrabajadores();
        return new ResponseEntity<>(trabajadores, HttpStatus.OK);
    }

    // Obtener todos los usuarios (clientes, interioristas, montadores)
    @GetMapping("/usuarios")
    public ResponseEntity<List<Object>> getAllUsuarios() {
        List<Object> usuarios = serviceDeKubico.findAllUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
}
