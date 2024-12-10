package org.springframework.samples.kubico.utilidades;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.web.exchanges.HttpExchange.Principal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.kubico.administrador.Admin;
import org.springframework.samples.kubico.auth.payload.response.MessageResponse;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.diseño.Disenio;
import org.springframework.samples.kubico.exceptions.AccessDeniedException;
import org.springframework.samples.kubico.interiorista.Interiorista;
import org.springframework.samples.kubico.montador.Montador;
import org.springframework.samples.kubico.pedido.Estado;
import org.springframework.samples.kubico.pedido.Pedido;
import org.springframework.samples.kubico.user.Authorities;
import org.springframework.samples.kubico.user.AuthoritiesService;
import org.springframework.samples.kubico.user.User;
import org.springframework.samples.kubico.user.UserService;
import org.springframework.samples.kubico.util.RestPreconditions;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/kubico")
public class ControllerDeKubico {
    private final static String relog = "RELOG";
    private final static String home = "HOME";

    private final ServiceDeKubico serviceDeKubico;
    private final UserService userService;
    private final AuthoritiesService authoritiesService;
    @Autowired
    public ControllerDeKubico(ServiceDeKubico serviceDeKubico, UserService userService, AuthoritiesService authoritiesService) {
        this.serviceDeKubico = serviceDeKubico;
        this.userService = userService;
        this.authoritiesService = authoritiesService;
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
    public ResponseEntity<List<Perfil>> getAllUsuarios() {
        List<Perfil> usuarios = serviceDeKubico.findAllUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/perfil")
    public ResponseEntity<Perfil> getProfile(Principal principal) {
        // Obtiene el usuario actual
        User user = userService.findCurrentUser();
        Object usuario = serviceDeKubico.findByUserId(user.getId());
        String tipoUsuario = serviceDeKubico.getUserTypeById(user.getId());
    
        // Crear objeto perfil
        Perfil perfil = new Perfil();
    
        // Rellena los datos del perfil según el tipo de usuario
        switch (tipoUsuario) {
            case "Cliente":
                Cliente cliente = (Cliente) usuario;
                perfil.setDireccion(cliente.getDireccion());
                perfil.setTelefono(cliente.getTelefono());
                perfil.setSecond_name(cliente.getSecond_name());
                perfil.setSexo(cliente.getSexo());
                perfil.setFirstName(cliente.getFirstName());
                perfil.setLastName(cliente.getLastName());
                break;
    
            case "Interiorista":
                Interiorista interiorista = (Interiorista) usuario;
                perfil.setDireccion(interiorista.getDireccion());
                perfil.setTelefono(interiorista.getTelefono());
                perfil.setSecond_name(interiorista.getSecond_name());
                perfil.setSexo(interiorista.getSexo());
                perfil.setFirstName(interiorista.getFirstName());
                perfil.setLastName(interiorista.getLastName());
                break;
    
            case "Montador":
                Montador montador = (Montador) usuario;
                perfil.setDireccion(montador.getDireccion());
                perfil.setTelefono(montador.getTelefono());
                perfil.setSecond_name(montador.getSecond_name());
                perfil.setSexo(montador.getSexo());
                perfil.setFirstName(montador.getFirstName());
                perfil.setLastName(montador.getLastName());
                break;
    
            case "Admin":
                Admin admin = (Admin) usuario;
                perfil.setDireccion(admin.getDireccion());
                perfil.setTelefono(admin.getTelefono());
                perfil.setSecond_name(admin.getSecond_name());
                perfil.setSexo(admin.getSexo());
                perfil.setFirstName(admin.getFirstName());
                perfil.setLastName(admin.getLastName());
                break;
    
            default:
                throw new NotFoundException("No se pudo determinar el tipo del usuario");
        }
    
        // Campos comunes
        perfil.setAuthority(user.getAuthority().getAuthority());
        
        perfil.setUsername(user.getUsername());
    
        // Retorna la respuesta
        return ResponseEntity.ok(perfil);
    }
    

    
    @PutMapping("/perfil/edit")
    public ResponseEntity<?> updateProfile(@RequestBody Perfil perfil, Principal principal) {
        // Obtiene el usuario actual
        User currentUser = userService.findCurrentUser();
    
        // Actualiza los datos del usuario
        User userToUpdate = new User();
        userToUpdate.setPassword(perfil.getPassword());
        userToUpdate.setUsername(perfil.getUsername());
        Boolean mismoUsername = userToUpdate.getUsername().equals(currentUser.getUsername());
        Boolean mismaContraseña = (userToUpdate.getPassword() == null || userToUpdate.getPassword().isEmpty());
    
        // Determinar el tipo de usuario asociado
        Object usuario = serviceDeKubico.findByUserId(currentUser.getId());
        String tipoUsuario = serviceDeKubico.getUserTypeById(currentUser.getId());
    
        switch (tipoUsuario) {
            case "Cliente":
                Cliente cliente = (Cliente) usuario;
                updateClienteData(cliente, perfil);
                serviceDeKubico.saveCliente(cliente);
                break;
    
            case "Interiorista":
                Interiorista interiorista = (Interiorista) usuario;
                updateInterioristaData(interiorista, perfil);
                serviceDeKubico.saveInteriorista(interiorista);
                break;
    
            case "Montador":
                Montador montador = (Montador) usuario;
                updateMontadorData(montador, perfil);
                serviceDeKubico.saveMontador(montador);
                break;
    
            case "Admin":
                Admin admin = (Admin) usuario;
                updateAdminData(admin, perfil);
                serviceDeKubico.saveAdmin(admin); // Crea un método saveAdmin si no existe.
                break;
    
            default:
                throw new NotFoundException("No se pudo determinar el tipo de usuario para actualizar el perfil.");
        }
    
        // Actualizar la información del usuario
        userService.updateCurrentUser(userToUpdate);
    
        // Verificar cambios de username o contraseña y responder en consecuencia
        if (!mismoUsername || !mismaContraseña) {
            return ResponseEntity.ok(relog); // Relog significa que el usuario debe volver a iniciar sesión
        } else {
            return ResponseEntity.ok(home); // Home significa que el perfil se actualizó sin necesidad de relog
        }
    }

    @PutMapping("/perfil/editOtro")
    public ResponseEntity<?> updateProfile(@RequestBody Perfil perfil, @RequestParam ("username") String username) {
        // Obtiene el usuario actual
        User currentUser = userService.findUser(username);
    

    
    
        // Determinar el tipo de usuario asociado
        Object usuario = serviceDeKubico.findByUserId(currentUser.getId());
        String tipoUsuario = serviceDeKubico.getUserTypeById(currentUser.getId());
    
        switch (tipoUsuario) {
            case "Cliente":
                Cliente cliente = (Cliente) usuario;
                updateClienteData(cliente, perfil);

                serviceDeKubico.saveCliente(cliente);
                break;
    
            case "Interiorista":
                Interiorista interiorista = (Interiorista) usuario;
                updateInterioristaData(interiorista, perfil);

                serviceDeKubico.saveInteriorista(interiorista);
                break;
    
            case "Montador":
                Montador montador = (Montador) usuario;
                updateMontadorData(montador, perfil);
                
                serviceDeKubico.saveMontador(montador);
                break;
    
            case "Admin":
                Admin admin = (Admin) usuario;
                updateAdminData(admin, perfil);
  
                serviceDeKubico.saveAdmin(admin); // Crea un método saveAdmin si no existe.
                break;
    
            default:
                throw new NotFoundException("No se pudo determinar el tipo de usuario para actualizar el perfil.");
        }
    
        // Actualizar la información del usuario
        
    
        // Verificar cambios de username o contraseña y responder en consecuencia
       
        return ResponseEntity.ok(relog); // Relog significa que el usuario debe volver a iniciar sesión
        
    }

    @PostMapping("/perfil/crearOtro")
    public ResponseEntity<?> crearProfile(@RequestBody Perfil perfil) {
        // Obtiene el usuario actual
        if(userService.existsUser(perfil.getUsername())) throw new IllegalArgumentException("Ya existe");
    
        
        User userToUpdate = new User();
        
        userToUpdate.setPassword(perfil.getPassword());
        userToUpdate.setUsername(perfil.getUsername());
        userToUpdate.setAuthority(authoritiesService.findByAuthority(perfil.getAuthority().toUpperCase()));
        userService.saveUser(userToUpdate);
        
    
        // Determinar el tipo de usuario asociado

    
        switch (perfil.getAuthority().toLowerCase()) {
            case "cliente":
                Cliente cliente = new Cliente();
                updateClienteData(cliente, perfil);
                cliente.setUser(userToUpdate);
                serviceDeKubico.saveCliente(cliente);
                break;
    
            case "interiorista":
                Interiorista interiorista = new Interiorista();
                updateInterioristaData(interiorista, perfil);
                interiorista.setUser(userToUpdate);
                serviceDeKubico.saveInteriorista(interiorista);
                break;
    
            case "montador":
                Montador montador =  new Montador();
                updateMontadorData(montador, perfil);
                montador.setUser(userToUpdate);
                serviceDeKubico.saveMontador(montador);
                break;
    
            case "admin":
                Admin admin = new Admin();
                updateAdminData(admin, perfil);
                admin.setUser(userToUpdate);
                serviceDeKubico.saveAdmin(admin); // Crea un método saveAdmin si no existe.
                break;
    
            default:
                throw new NotFoundException("No se pudo determinar el tipo de usuario para actualizar el perfil.");
        }
       
        return ResponseEntity.ok(relog); // Relog significa que el usuario debe volver a iniciar sesión
        
    }

    private void updateClienteData(Cliente cliente, Perfil perfil) {
        cliente.setDireccion(perfil.getDireccion());
        cliente.setTelefono(perfil.getTelefono());
        cliente.setSecond_name(perfil.getSecond_name());
        cliente.setSexo(perfil.getSexo());
        cliente.setFirstName(perfil.getFirstName());
        cliente.setLastName(perfil.getLastName());
    }
    
    private void updateInterioristaData(Interiorista interiorista, Perfil perfil) {
        interiorista.setDireccion(perfil.getDireccion());
        interiorista.setTelefono(perfil.getTelefono());
        interiorista.setSecond_name(perfil.getSecond_name());
        interiorista.setSexo(perfil.getSexo());
        interiorista.setFirstName(perfil.getFirstName());
        interiorista.setLastName(perfil.getLastName());
    }
    
    private void updateMontadorData(Montador montador, Perfil perfil) {
        montador.setDireccion(perfil.getDireccion());
        montador.setTelefono(perfil.getTelefono());
        montador.setSecond_name(perfil.getSecond_name());
        montador.setSexo(perfil.getSexo());
        montador.setFirstName(perfil.getFirstName());
        montador.setLastName(perfil.getLastName());
    }
    
    private void updateAdminData(Admin admin, Perfil perfil) {
        admin.setDireccion(perfil.getDireccion());
        admin.setTelefono(perfil.getTelefono());
        admin.setSecond_name(perfil.getSecond_name());
        admin.setSexo(perfil.getSexo());
        admin.setFirstName(perfil.getFirstName());
        admin.setLastName(perfil.getLastName());
    }
    
    @GetMapping("/pedidos")
    public ResponseEntity<List<Pedido>> getPedidosByCurrentUser() {
        Integer currentUserId = userService.findCurrentUser().getId();
        List<Pedido> pedidos = serviceDeKubico.findPedidosByUserId(currentUserId);
        return ResponseEntity.ok(pedidos);
    }


    @GetMapping("/pedidos/todos")
    public ResponseEntity<List<Pedido>> getAllPedidos(){
        List<Pedido> pedidos = serviceDeKubico.findAllPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/pedidos/{pedidoId}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Integer pedidoId) {
        Pedido pedido = serviceDeKubico.findPedidoById(pedidoId);
        return ResponseEntity.ok(pedido);
    }


    @GetMapping("/pedidos/{pedidoId}/disenio")
    public ResponseEntity<Disenio> getDisenioByPedidoId(@PathVariable Integer pedidoId) {
        Disenio disenio = serviceDeKubico.findDisenioByPedidoId(pedidoId);
        return ResponseEntity.ok(disenio);
    }

    @GetMapping("/disenios/{disenioId}")
    public ResponseEntity<Disenio> getDisenioById(@PathVariable Integer disenioId) {
        Disenio disenio = serviceDeKubico.findDisenioByDisenioId(disenioId);
        return ResponseEntity.ok(disenio);
    }


    @PutMapping("/disenios/{disenioId}")
    public ResponseEntity<Disenio> actualizarDisenioById(@PathVariable Integer disenioId, @RequestBody Disenio disenioNuevo) {
               
            Disenio disenio = serviceDeKubico.actualizarDisenio(disenioNuevo);
            return ResponseEntity.ok(disenio);       
            
    }
    
    @PostMapping("/disenios/{disenioId}")
    public ResponseEntity<Pedido> encargarDisenioById(@PathVariable Integer disenioId, @RequestBody Disenio disenioNuevo) {

            Pedido pedido = serviceDeKubico.encargarDisenio(disenioNuevo);
            return ResponseEntity.ok(pedido);
     
    }

    @PostMapping("/disenios")
    public ResponseEntity<Disenio> crearDisenioNuevo( @RequestBody Disenio disenioNuevo) {
        
        Disenio disenio = serviceDeKubico.saveDisenio(disenioNuevo,userService.findCurrentUser().getId());
        return ResponseEntity.ok(disenio);
                
    }


    @DeleteMapping("/disenios/{disenioId}")
    public ResponseEntity<MessageResponse> borrarDisenioById(@PathVariable Integer disenioId) {
        Disenio disenio = serviceDeKubico.findDisenioByDisenioId(disenioId);
        serviceDeKubico.deleteDisenio(disenio);
        return new ResponseEntity<>(new MessageResponse("Disenio deleted!"), HttpStatus.OK);
    }


    @GetMapping("/disenios")
    public ResponseEntity<List<Disenio>> getDiseniosById() {
        Integer currentUserId = userService.findCurrentUser().getId();
        Integer clienteId = serviceDeKubico.findClienteByUserId(currentUserId).getId();
        List<Disenio> disenios = serviceDeKubico.findAllDiseniosByClienteId(clienteId);
       
        return ResponseEntity.ok(disenios);
    }

    @PatchMapping("/pedidos/{pedidoId}")
    public ResponseEntity<Pedido> getDiseniosById(@PathVariable Integer pedidoId, @RequestParam String accion) {
        Pedido pedido = new Pedido();
        if(accion.toLowerCase().equals("si")){
            pedido = serviceDeKubico.actualizarPedido(pedidoId, Estado.ACEPTADO);
        } else if (accion.toLowerCase().equals("no")) {
            pedido = serviceDeKubico.actualizarPedido(pedidoId, Estado.RECHAZADO);
        } else{
            throw new  IllegalArgumentException("Algun valor introducido es erroneo");
        }
            
        return ResponseEntity.ok(pedido);
    
    }

    @DeleteMapping("/usuarios/borrar")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<MessageResponse> delete(@RequestParam("username") String username) {
        User currentUser = userService.findCurrentUser();
        Integer userId = userService.findUser(username).getId();
        String tipoUsuario = serviceDeKubico.getUserTypeById(userId);

        switch (tipoUsuario) {
            case "Cliente":
                Cliente cliente = serviceDeKubico.findClienteByUserId(userId);
                
                serviceDeKubico.deleteCliente(cliente);
                break;
    
            case "Interiorista":
                Interiorista interiorista = serviceDeKubico.findInterioristaByUserId(userId);
                
                serviceDeKubico.deleteInteriorista(interiorista);
                break;
    
            case "Montador":
                Montador montador = serviceDeKubico.findMontadorByUserId(userId);
       
                serviceDeKubico.deleteMontador(montador);
                break;
            default:
                throw new AccessDeniedException("Rol incorrecto");
        }

		if (currentUser.getUsername() != username) {
			userService.deleteUser(userId);
			return new ResponseEntity<>(new MessageResponse("User deleted!"), HttpStatus.OK);
		} else
			throw new AccessDeniedException("You can't delete yourself!");
	}

}
