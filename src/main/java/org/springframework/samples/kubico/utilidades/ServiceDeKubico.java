package org.springframework.samples.kubico.utilidades;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.samples.kubico.administrador.Admin;
import org.springframework.samples.kubico.administrador.AdminRepository;
import org.springframework.samples.kubico.cliente.Cliente;
import org.springframework.samples.kubico.cliente.ClienteRepository;
import org.springframework.samples.kubico.diseño.Disenio;
import org.springframework.samples.kubico.diseño.DisenioRepository;
import org.springframework.samples.kubico.diseño.Modulo;
import org.springframework.samples.kubico.diseño.ModuloRepository;
import org.springframework.samples.kubico.interiorista.Interiorista;
import org.springframework.samples.kubico.interiorista.InterioristaRepository;
import org.springframework.samples.kubico.montador.Montador;
import org.springframework.samples.kubico.montador.MontadorRepository;
import org.springframework.samples.kubico.pedido.Estado;
import org.springframework.samples.kubico.pedido.Pedido;
import org.springframework.samples.kubico.pedido.PedidoRepository;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ServiceDeKubico {

    private final AdminRepository adminRepository;
    private final ClienteRepository clienteRepository;
    private final InterioristaRepository interioristaRepository;
    private final MontadorRepository montadorRepository;
    private final PedidoRepository pedidoRepository;
    private final DisenioRepository disenioRepository;
    private final ModuloRepository moduloRepository;

    @Autowired
    public ServiceDeKubico(
        AdminRepository adminRepository,
        ClienteRepository clienteRepository,
        InterioristaRepository interioristaRepository,
        MontadorRepository montadorRepository, PedidoRepository pedidoRepository, 
        DisenioRepository disenioRepository,ModuloRepository moduloRepository) {
            this.adminRepository = adminRepository;
            this.clienteRepository = clienteRepository;
            this.interioristaRepository = interioristaRepository;
            this.montadorRepository = montadorRepository;
            this.disenioRepository = disenioRepository;
            this.pedidoRepository = pedidoRepository;
            this.moduloRepository = moduloRepository;
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



    @Transactional
    public void deleteCliente(Cliente cliente) {
        clienteRepository.delete(cliente);
    }
    @Transactional
    public void deleteDisenio(Disenio disenio) {
        disenioRepository.delete(disenio);
    }

    @Transactional
    public void deleteInteriorista(Interiorista interiorista) {
        interioristaRepository.delete(interiorista);
    }
    @Transactional
    public void deleteMontador(Montador montador) {
        montadorRepository.delete(montador);
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
    public List<Perfil> findAllUsuarios() {
        List<Perfil> usuarios = new ArrayList<>();
        
        
        clienteRepository.findAll().forEach(cliente -> {
            Perfil perfil = new Perfil();
            perfil.setUsername(cliente.getUser().getUsername());
            perfil.setPassword(cliente.getUser().getPassword());
            perfil.setAuthority(cliente.getUser().getAuthority().getAuthority());
            perfil.setFirstName(cliente.getFirstName());
            perfil.setSecond_name(cliente.getSecond_name());
            perfil.setLastName(cliente.getLastName());
            perfil.setDireccion(cliente.getDireccion());
            perfil.setTelefono(cliente.getTelefono());
            perfil.setSexo(cliente.getSexo());
            usuarios.add(perfil);
        });


        interioristaRepository.findAll().forEach(interiorista -> {
            Perfil perfil = new Perfil();
            perfil.setUsername(interiorista.getUser().getUsername());
            perfil.setPassword(interiorista.getUser().getPassword());
            perfil.setAuthority(interiorista.getUser().getAuthority().getAuthority());
            perfil.setFirstName(interiorista.getFirstName());
            perfil.setSecond_name(interiorista.getSecond_name());
            perfil.setLastName(interiorista.getLastName());
            perfil.setDireccion(interiorista.getDireccion());
            perfil.setTelefono(interiorista.getTelefono());
            perfil.setSexo(interiorista.getSexo());
            usuarios.add(perfil);
        });


        montadorRepository.findAll().forEach(montador -> {
            Perfil perfil = new Perfil();
            perfil.setUsername(montador.getUser().getUsername());
            perfil.setPassword(montador.getUser().getPassword());
            perfil.setAuthority(montador.getUser().getAuthority().getAuthority());
            perfil.setFirstName(montador.getFirstName());
            perfil.setSecond_name(montador.getSecond_name());
            perfil.setLastName(montador.getLastName());
            perfil.setDireccion(montador.getDireccion());
            perfil.setTelefono(montador.getTelefono());
            perfil.setSexo(montador.getSexo());
            usuarios.add(perfil);
        });

        return usuarios;
    }


    @Transactional
    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Transactional
    public Disenio saveDisenio(Disenio disenio, Integer userId) {
        disenio.setCliente(findClienteByUserId(userId));
        if(disenio.getFechaEstimada() ==null){
            disenio.setFechaEstimada(LocalDate.now().plusDays(8));
        }
        if(disenio.getPrecioEstimado() ==null){
            disenio.setPrecioEstimado(208.99);;
        }
        if(disenio.getTipo().toLowerCase().equals("armario")){
            disenio.setFoto("http://localhost:8080/resources/images/fotoArmario.jpg"); 
        } else if (disenio.getTipo().toLowerCase().equals("frente")){
            disenio.setFoto("http://localhost:8080/resources/images/fotoPuerta.png"); 
        } else if(disenio.getTipo().toLowerCase().equals("vestidor")){
            disenio.setFoto("http://localhost:8080/resources/images/fotoVestidor.jpg"); 
        }
        
        
        return disenioRepository.save(disenio);
    }


    @Transactional
    public Interiorista saveInteriorista(Interiorista interiorista) {
        return interioristaRepository.save(interiorista);
    }


    @Transactional
    public Montador saveMontador(Montador montador) {
        return montadorRepository.save(montador);
    }

    @Transactional
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
    @Transactional(readOnly = true)
    public Object findByUserId(Integer userId) {

        if (clienteRepository.findByUser(userId).isPresent()) {
            return clienteRepository.findByUser(userId)
                .orElseThrow(() -> new NotFoundException("No se encontró un cliente con ese ID"));
        }


        if (interioristaRepository.findByUser(userId).isPresent()) {
            return interioristaRepository.findByUser(userId)
                .orElseThrow(() -> new NotFoundException("No se encontró un interiorista con ese ID"));
        }


        if (montadorRepository.findByUser(userId).isPresent()) {
            return montadorRepository.findByUser(userId)
                .orElseThrow(() -> new NotFoundException("No se encontró un montador con ese ID"));
        }
        if (adminRepository.findByUser(userId).isPresent()) {
            return adminRepository.findByUser(userId)
                .orElseThrow(() -> new NotFoundException("No se encontró un montador con ese ID"));
        }


        throw new NotFoundException("No se encontró un usuario con ese ID");
    }

    public String getUserTypeById(Integer userId) {
        if (clienteRepository.findByUser(userId).isPresent()) {
            return "Cliente";
        }
        if (interioristaRepository.findByUser(userId).isPresent()) {
            return "Interiorista";
        }
        if (montadorRepository.findByUser(userId).isPresent()) {
            return "Montador";
        }

        if(adminRepository.findByUser(userId).isPresent()){
            return "Admin";
        }
        throw new NotFoundException("No se encontró un usuario con ese ID");
    }

    @Transactional(readOnly = true)
    public List<Pedido> findPedidosByUserId(Integer userId) {

        String userType = getUserTypeById(userId);

        switch (userType) {
            case "Cliente":
                Cliente cliente = (Cliente) findByUserId(userId);
                return pedidoRepository.findByClienteId(cliente.getId());

            case "Interiorista":
                Interiorista interiorista = (Interiorista) findByUserId(userId);
                return pedidoRepository.findByInterioristaId(interiorista.getId());

            case "Montador":
                Montador montador = (Montador) findByUserId(userId);
                return pedidoRepository.findByMontadorId(montador.getId());

            default:
                throw new NotFoundException("No se encontraron pedidos para el userId proporcionado.");
        }
    }

    @Transactional(readOnly = true)
    public List<Pedido> findPedidosByClienteId(Integer userId) {
        Cliente cliente = (Cliente) findByUserId(userId);
        return pedidoRepository.findByClienteId(cliente.getId());
    }

    @Transactional(readOnly = true)
    public List<Pedido> findPedidosByInterioristaId(Integer userId) {
        Interiorista interiorista = (Interiorista) findByUserId(userId);
        return pedidoRepository.findByInterioristaId(interiorista.getId());
    }

    @Transactional(readOnly = true)
    public List<Pedido> findPedidosByMontadorId(Integer userId) {
        Montador montador = (Montador) findByUserId(userId);
        return pedidoRepository.findByMontadorId(montador.getId());
    }



    @Transactional(readOnly = true)
    public Disenio findDisenioByPedidoId(Integer pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new NotFoundException("No se encontró el pedido con ID " + pedidoId));
        Disenio disenio = pedido.getDisenio();
        if (disenio == null) {
            throw new NotFoundException("No se encontró un diseño asociado al pedido con ID " + pedidoId);
        }
        return disenio;
    }


    @Transactional(readOnly = true)
    public Disenio findDisenioByDisenioId(Integer disenioId) {
        return disenioRepository.findById(disenioId)
            .orElseThrow(() -> new NotFoundException("No se encontro el disenio con ID " + disenioId));
    }

    @Transactional(readOnly = true)
    public Pedido findPedidoById(Integer pedidoId) {
        return pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new NotFoundException("No se encontró el pedido con ID " + pedidoId));
    }


    @Transactional(readOnly = true)
    public List<Disenio> findAllDiseniosByClienteId(Integer clienteId){
        return disenioRepository.findByClienteId(clienteId);
    }

    @Transactional(readOnly = true)
    public List<Pedido> findAllPedidos(){
        return (List<Pedido>) pedidoRepository.findAll();
    }

    @Transactional
    public Pedido actualizarPedido(Integer pedidoId, Estado estado) {
        
        Pedido pedido = pedidoRepository.findById(pedidoId)
        .orElseThrow(() -> new NotFoundException("No se encontró el pedido con ID " + pedidoId));
        pedido.setEstado(estado);
        if(estado.equals(Estado.ACEPTADO)){
            pedido.setMontador(montadorRepository.findById(1).get());
        }
        

        return pedidoRepository.save(pedido);
    }



    //TODO CAMBIAR MODULOS
    @Transactional
    public Disenio actualizarDisenio(Disenio disenioNuevo) {
        // Buscar el diseño por su ID
        Disenio disenio = disenioRepository.findById(disenioNuevo.getId())
        .orElseThrow(() -> new NotFoundException("No se encontró el diseño con ID " + disenioNuevo.getId()));

        Double altoAntes = disenio.getAlto();
        Double anchoAntes = disenio.getAncho();
        Double fondoAntes = disenio.getFondo();
        Double precioAntes =disenio.getPrecioEstimado();
        LocalDate fechaAntes = disenio.getFechaEstimada();
       
        disenio.setTipoPuerta(disenioNuevo.getTipoPuerta());  
        disenio.setAlto(disenioNuevo.getAlto());
        disenio.setAncho(disenioNuevo.getAncho());
        disenio.setFondo(disenioNuevo.getFondo());        


        disenio.setNumPuertas(disenioNuevo.getNumPuertas());  

        if(altoAntes>disenio.getAlto()){
            disenio.setFechaEstimada(fechaAntes.plusDays(5));
            disenio.setPrecioEstimado(precioAntes + 66.2);
        }else if(altoAntes< disenio.getAlto()){
            disenio.setFechaEstimada(fechaAntes.minusDays(3));
            disenio.setPrecioEstimado(precioAntes - 12.99);
        }

        if(fondoAntes>disenio.getFondo()){
            disenio.setFechaEstimada(fechaAntes.plusDays(5));
            disenio.setPrecioEstimado(precioAntes + 66.2);
        }else if(fondoAntes< disenio.getFondo()){
            disenio.setFechaEstimada(fechaAntes.minusDays(3));
            disenio.setPrecioEstimado(precioAntes - 12.99);
        }
        if(anchoAntes>disenio.getAncho()){
            disenio.setFechaEstimada(fechaAntes.plusDays(5));
            disenio.setPrecioEstimado(precioAntes + 66.2);
        }else if(anchoAntes< disenio.getAncho()){
            disenio.setFechaEstimada(fechaAntes.minusDays(3));
            disenio.setPrecioEstimado(precioAntes - 12.99);
        }
        
        return disenioRepository.save(disenio);
    }

    @Transactional
    public List<Modulo> actualizarModulos (List<Modulo> modulosNuevos, Integer disenioId){
        Disenio disenio = disenioRepository.findById(disenioId)
        .orElseThrow(() -> new NotFoundException("No se encontró el diseño con ID " + disenioId));

        List<Modulo> modulosViejos = disenioRepository.findAllModulosByDisenioId(disenioId);
        
        for (Modulo moduloViejo: modulosViejos){
            moduloRepository.delete(moduloViejo);
        }

        for(Modulo moduloNuevo: modulosNuevos){
            moduloNuevo.setDisenio(disenio);
            moduloRepository.save(moduloNuevo);
        }
        return modulosNuevos;

    }
    public List<Modulo> findAllModulosByDisenioId(Integer disenioId){
        Disenio disenio = disenioRepository.findById(disenioId)
        .orElseThrow(() -> new NotFoundException("No se encontró el diseño con ID " + disenioId));

        return disenioRepository.findAllModulosByDisenioId(disenio.getId());
    }


 

    @Transactional
    public Pedido guardarPedido(Pedido pedido){
        return pedidoRepository.save(pedido);
    }
    

    @Transactional
    public Pedido encargarDisenio(Disenio disenioMandado){
        Disenio disenio= actualizarDisenio(disenioMandado);
        
        Pedido pedido = new Pedido();
        
        pedido.setDisenio(disenio);
        pedido.setCliente(disenio.getCliente());
        pedido.setEstado(Estado.EN_REVISION);
        pedido.setFechaEstimada(disenio.getFechaEstimada()!=null ? disenio.getFechaEstimada(): LocalDate.now().plusDays(23));
        pedido.setFechaPedido(LocalDate.now());
        pedido.setInteriorista(interioristaRepository.findById(1).get());
        pedido.setPagado("40%");
        pedido.setPrecio(disenio.getPrecioEstimado()!=null? disenio.getPrecioEstimado():700);
        pedido.setReferencia("PEDIDOOOK");

        return guardarPedido(pedido);
        
    }

    
}

