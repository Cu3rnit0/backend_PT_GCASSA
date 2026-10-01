create database Prueba_Tecnica;

use Prueba_Tecnica;

create Table Haciendas 
(
	id int identity(1,1) primary key, 
	nombre nvarchar(150) not null,
	ubicacion nvarchar(250) not null,
	estatus bit not null default 1 
);

select * from Haciendas;

insert into Haciendas (nombre, ubicacion, estatus)
values
	('Hacienda El Paraíso','sonsonate',1),
	('Hacienda Las Palmas','sonsonate',1),
	('Hacienda San Miguel','San Miguel',0);
