-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO authorities(id,authority) VALUES (2,'CLIENTE');
INSERT INTO authorities(id,authority) VALUES (3,'INTERIORISTA');
INSERT INTO authorities(id,authority) VALUES (4,'MONTADOR');

-- PROYECTO IR
INSERT INTO appusers(id,username,password,authority) VALUES (101,'admin','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',1);
INSERT INTO appusers(id,username,password,authority) VALUES (102,'cliente1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',2);
INSERT INTO appusers(id,username,password,authority) VALUES (106,'cliente2','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',2);
INSERT INTO appusers(id,username,password,authority) VALUES (103,'interiorista1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (105,'interiorista2','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (104,'montador1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',4);




INSERT INTO admins (id, first_name, last_name, second_name, direccion, telefono, sexo, user_id)
VALUES (1, 'Juan', 'Perez', 'Antonio', 'Calle 123', '1234567890', 'HOMBRE', 101);


INSERT INTO clientes (id, first_name, last_name, second_name, direccion, telefono, sexo, user_id)
VALUES (1, 'Maria', 'Gomez', 'Elena', 'Avenida 456', '0987654321', 'MUJER', 102);
INSERT INTO clientes (id, first_name, last_name, second_name, direccion, telefono, sexo, user_id)
VALUES (2, 'Enzo', 'Lopetegui', '', 'Pehuenco 2', '5155522241', 'OTRO', 106);


INSERT INTO interioristas (id, first_name, last_name, second_name, direccion, telefono, sexo, user_id)
VALUES (1, 'Carlos', 'Lopez', 'Javier', 'Plaza Central 789', '1122334455', 'HOMBRE', 103);
INSERT INTO interioristas (id, first_name, last_name, second_name, direccion, telefono, sexo, user_id)
VALUES (2, 'Marta', 'Lopez', 'Susana', 'Chocolates derretidos 76', '1244144412', 'MUJER', 105);


INSERT INTO montadores (id, first_name, last_name, second_name, direccion, telefono, sexo, user_id)
VALUES (1, 'Ana', 'Martinez', 'Lucía', 'Boulevard 321', '5566778899', 'OTRO', 104);



-- añadido:
INSERT INTO disenio (id, tipo, tipo_puerta, observaciones, num_puertas, alto, ancho, fondo, nombre,cliente_id, fecha_estimada,precio_estimado, foto) VALUES (1,'Puerta', 'Corredera', 'Puerta acabado de vidrio templado', 2, 2.1, 1.5, 0.4, 'Diseno Vidrio 1',1,'2024-12-29',600.9,'http://localhost:8080/resources/images/foto_prueba.jpg' );
INSERT INTO disenio (id, tipo, tipo_puerta, observaciones, num_puertas, alto, ancho, fondo, nombre,cliente_id,fecha_estimada, precio_estimado, foto ) VALUES (2,'Armario', 'Abatible', 'Armario de madera barnizada', 1, 2.0, 0.9, 0.5, 'Diseno Madera 1',1,'2024-12-28',366.7,'http://localhost:8080/resources/images/foto_prueba.jpg');
INSERT INTO disenio (id, tipo, tipo_puerta, observaciones, num_puertas, alto, ancho, fondo, nombre, cliente_id,fecha_estimada, precio_estimado,foto) VALUES (3,'Armario', 'Corredera', 'Sin observaciones', 1, 2.2, 1.8, 0.6, 'Armario para la habitacion',2,'2024-12-27',777.99,'http://localhost:8080/resources/images/foto_prueba.jpg');
INSERT INTO disenio (id, tipo, tipo_puerta, observaciones, num_puertas, alto, ancho, fondo, nombre, cliente_id,fecha_estimada,precio_estimado, foto) VALUES (4,'Vestidor', 'No', 'Sin observaciones', 1, 2.3, 1.0, 0.3, 'Diseno Minimalista 1',2,'2024-12-26',150.87,'http://localhost:8080/resources/images/foto_prueba.jpg');
INSERT INTO disenio (id, tipo, tipo_puerta, observaciones, num_puertas, alto, ancho, fondo, nombre, cliente_id,fecha_estimada,precio_estimado, foto) VALUES (5,'Armario', 'Abatible', 'Con detalles artesanales', 2, 2.0, 1.2, 0.5, 'Diseno Rustico 1',2,'2024-12-23',567.0,'http://localhost:8080/resources/images/foto_prueba.jpg');
INSERT INTO disenio (id, tipo, tipo_puerta, observaciones, num_puertas, alto, ancho, fondo, nombre, cliente_id,fecha_estimada,precio_estimado, foto) VALUES (6,'Armario', 'Abatible', 'Con detalles artesanales', 2, 2.0, 1.2, 0.5, 'Diseno Rustico 1',1,'2024-12-23',567.0,'http://localhost:8080/resources/images/foto_prueba.jpg');


INSERT INTO modulos(id, ancho, alto, fondo, iluminacion, pantalonero, zapatero, tipo_material, num_cajoneras,num_baldas, disenio_id) VALUES 
                   (1,   2.3,   3.4,   2.2,  'costado',       'no',     'no',      'blanco',       2,           3,           1);
INSERT INTO modulos(id,ancho,alto,fondo,iluminacion,pantalonero, zapatero,tipo_material, num_cajoneras,num_baldas, disenio_id) VALUES (2,2.5, 3.5, 2.1, 'ninguna', 'no','no','negro', 2, 2, 2);
INSERT INTO modulos(id,ancho,alto,fondo,iluminacion,pantalonero, zapatero,tipo_material, num_cajoneras,num_baldas, disenio_id) VALUES (3,2.6, 3.6, 2.6, 'ninguna', 'no','no','turquesa', 2,2, 3);
 

INSERT INTO pedido (id, referencia, precio, cliente_id, interiorista_id, disenio_id, montador_id, fecha_estimada, fecha_pedido,  estado, pagado) VALUES 
                    (1,'prueba',     1500.00, 1,              1,              3,           1,       '2024-01-15', '2023-12-01', 'ACEPTADO','50%');
INSERT INTO pedido (id, referencia, precio, cliente_id, interiorista_id, disenio_id, montador_id, fecha_estimada, fecha_pedido,  estado, pagado) VALUES 
                    (2, 'prueba2',     2500.00, 2,           2,              1         ,NULL,         '2024-02-20', '2023-12-03', 'EN_REVISION' ,'Pendiente de Pago');
INSERT INTO pedido (id, referencia, precio, cliente_id, interiorista_id, disenio_id,montador_id, fecha_estimada, fecha_pedido,  estado, pagado) VALUES 
                   (3,  'prueba3',    3200.00,  2,          1,               2,          NULL, '2024-03-10', '2023-12-02',    'EN_REVISION'     ,'Pendiente de pago');