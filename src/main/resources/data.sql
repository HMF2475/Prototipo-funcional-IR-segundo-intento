-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO authorities(id,authority) VALUES (2,'CLIENTE');
INSERT INTO authorities(id,authority) VALUES (3,'INTERIORISTA');
INSERT INTO authorities(id,authority) VALUES (4,'MONTADOR');

INSERT INTO appusers(id,username,password,authority) VALUES (1,'admin1','$2a$10$nMmTWAhPTqXqLDJTag3prumFrAJpsYtroxf0ojesFYq0k4PmcbWUS',1);

-- Three clinic owners, with password "clinic_owner"
INSERT INTO appusers(id,username,password,authority) VALUES (2,'clinicOwner1','$2a$10$t.I/C4cjUdUWzqlFlSddLeh9SbZ6d8wR7mdbeIRghT355/KRKZPAi',2);
INSERT INTO appusers(id,username,password,authority) VALUES (3,'clinicOwner2','$2a$10$t.I/C4cjUdUWzqlFlSddLeh9SbZ6d8wR7mdbeIRghT355/KRKZPAi',2);

INSERT INTO clinic_owners(id,first_name,last_name,user_id) VALUES (1, 'John', 'Doe', 2);
INSERT INTO clinic_owners(id,first_name,last_name,user_id) VALUES (2, 'Jane', 'Doe', 3);

INSERT INTO clinics(id, name, address, telephone, plan, clinic_owner) VALUES (1, 'Clinic 1', 'Av. Palmera, 26', '955684230', 'PLATINUM', 1);
INSERT INTO clinics(id, name, address, telephone, plan, clinic_owner) VALUES (2, 'Clinic 2', 'Av. Torneo, 52', '955634232', 'GOLD', 2);
INSERT INTO clinics(id, name, address, telephone, plan, clinic_owner) VALUES (3, 'Clinic 3', 'Av. Reina Mercedes, 70', '955382238', 'BASIC', 2);

-- Ten owner user, named owner1 with passwor 0wn3r
INSERT INTO appusers(id,username,password,authority) VALUES (4,'owner1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (5,'owner2','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (6,'owner3','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (7,'owner4','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (8,'owner5','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (9,'owner6','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (10,'owner7','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (11,'owner8','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (12,'owner9','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (13,'owner10','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
-- One vet user, named vet1 with passwor v3t
/*INSERT INTO users(username,password,enabled) VALUES ('vet1','v3t',TRUE);
INSERT INTO authorities(id,username,authority) VALUES (12,'vet1','veterinarian');*/
INSERT INTO appusers(id,username,password,authority) VALUES (14,'vet1','$2a$10$aeypcHWSf4YEkDAF0d.vjOLu94aS40MBUb4rOtDncFxZdo2wpkt8.',4);
INSERT INTO appusers(id,username,password,authority) VALUES (15,'vet2','$2a$10$aeypcHWSf4YEkDAF0d.vjOLu94aS40MBUb4rOtDncFxZdo2wpkt8.',4);
INSERT INTO appusers(id,username,password,authority) VALUES (16,'vet3','$2a$10$aeypcHWSf4YEkDAF0d.vjOLu94aS40MBUb4rOtDncFxZdo2wpkt8.',4);
INSERT INTO appusers(id,username,password,authority) VALUES (17,'vet4','$2a$10$aeypcHWSf4YEkDAF0d.vjOLu94aS40MBUb4rOtDncFxZdo2wpkt8.',4);
INSERT INTO appusers(id,username,password,authority) VALUES (18,'vet5','$2a$10$aeypcHWSf4YEkDAF0d.vjOLu94aS40MBUb4rOtDncFxZdo2wpkt8.',4);
INSERT INTO appusers(id,username,password,authority) VALUES (19,'vet6','$2a$10$aeypcHWSf4YEkDAF0d.vjOLu94aS40MBUb4rOtDncFxZdo2wpkt8.',4);

INSERT INTO vets(id, first_name,last_name,city, clinic, user_id) VALUES (1, 'James', 'Carter','Sevilla', 1, 14);
INSERT INTO vets(id, first_name,last_name,city, clinic, user_id) VALUES (2, 'Helen', 'Leary','Sevilla', 1, 15);
INSERT INTO vets(id, first_name,last_name,city, clinic, user_id) VALUES (3, 'Linda', 'Douglas','Sevilla', 2, 16);
INSERT INTO vets(id, first_name,last_name,city, clinic, user_id) VALUES (4, 'Rafael', 'Ortega','Badajoz', 2, 17);
INSERT INTO vets(id, first_name,last_name,city, clinic, user_id) VALUES (5, 'Henry', 'Stevens','Badajoz', 3, 18);
INSERT INTO vets(id, first_name,last_name,city, clinic, user_id) VALUES (6, 'Sharon', 'Jenkins','Cádiz', 3, 19);

INSERT INTO specialties(id,name) VALUES (1, 'radiology');
INSERT INTO specialties(id,name) VALUES (2, 'surgery');
INSERT INTO specialties(id,name) VALUES (3, 'dentistry');

INSERT INTO vet_specialties(vet_id,specialty_id) VALUES (2, 1);
INSERT INTO vet_specialties(vet_id,specialty_id) VALUES (3, 2);
INSERT INTO vet_specialties(vet_id,specialty_id) VALUES (3, 3);
INSERT INTO vet_specialties(vet_id,specialty_id) VALUES (4, 2);
INSERT INTO vet_specialties(vet_id,specialty_id) VALUES (5, 1);

INSERT INTO types(id,name)  VALUES (1, 'cat');
INSERT INTO types(id,name)  VALUES (2, 'dog');
INSERT INTO types(id,name)  VALUES (3, 'lizard');
INSERT INTO types(id,name)  VALUES (4, 'snake');
INSERT INTO types(id,name)  VALUES (5, 'bird');
INSERT INTO types(id,name)  VALUES (6, 'hamster');
INSERT INTO types(id,name)  VALUES (7, 'turtle');

INSERT INTO	owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (1, 'George', 'Franklin', '110 W. Liberty St.', 'Sevilla', '608555103', 4, 1);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (2, 'Betty', 'Davis', '638 Cardinal Ave.', 'Sevilla', '608555174', 5, 1);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (3, 'Eduardo', 'Rodriquez', '2693 Commerce St.', 'Sevilla', '608558763', 6, 1);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (4, 'Harold', 'Davis', '563 Friendly St.', 'Sevilla', '608555319', 7, 2);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (5, 'Peter', 'McTavish', '2387 S. Fair Way', 'Sevilla', '608555765', 8, 2);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (6, 'Jean', 'Coleman', '105 N. Lake St.', 'Badajoz', '608555264', 9, 2);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (7, 'Jeff', 'Black', '1450 Oak Blvd.', 'Badajoz', '608555538', 10, 3);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (8, 'Maria', 'Escobito', '345 Maple St.', 'Badajoz', '608557683', 11, 3);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (9, 'David', 'Schroeder', '2749 Blackhawk Trail','Cádiz', '685559435', 12, 3);
INSERT INTO owners(id, first_name, last_name, address, city, telephone, user_id, clinic) VALUES (10, 'Carlos', 'Estaban', '2335 Independence La.', 'Cádiz', '685555487', 13, 1);

INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (1, 'Leo', '2010-09-07', 1, 1);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (2, 'Basil', '2012-08-06', 6, 2);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (3, 'Rosy', '2011-04-17', 2, 3);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (4, 'Jewel', '2010-03-07', 2, 3);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (5, 'Iggy', '2010-11-30', 3, 4);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (6, 'George', '2010-01-20', 4, 5);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (7, 'Samantha', '2012-09-04', 1, 6);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (8, 'Max', '2012-09-04', 1, 6);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (9, 'Lucky', '2011-08-06', 5, 7);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (10, 'Mulligan', '2007-02-24', 2, 8);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (11, 'Freddy', '2010-03-09', 5, 9);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (12, 'Lucky', '2010-06-24', 2, 10);
INSERT INTO pets(id,name,birth_date,type_id,owner_id) VALUES (13, 'Sly', '2012-06-08', 1, 10);

INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (1, 7, '2013-01-01 13:00', 'rabies shot', 4);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (2, 8, '2013-01-02 15:30', 'rabies shot', 5);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (3, 8, '2013-01-03 9:45', 'neutered', 5);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (4, 7, '2013-01-04 17:30', 'spayed', 4);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (5, 1, '2013-01-01 13:00', 'rabies shot', 1);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (6, 1, '2020-01-02 15:30', 'rabies shot', 1);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (7, 1, '2020-01-02 15:30', 'rabies shot', 1);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (8, 2, '2013-01-03 9:45', 'neutered', 2);
INSERT INTO visits(id,pet_id,visit_date_time,description,vet_id) VALUES (9, 3, '2013-01-04 17:30', 'spayed', 3);




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