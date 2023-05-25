# App Facturacion Electronica

This Project is build in Angular 12, to work with it without problems we need Nodejs version 16.17.0.
The Backend is build With Loopback 3, Mysql MongoDB

All the requirements can be seen in the oficila webpage of Impuestos Nacionales de Bolivia Sistema Integral de Administración Tributaria (SIAT).
https://siatinfo.impuestos.gob.bo/index.php/facturacion-en-linea/factura-electronica

I built this project to meet a necessity, in Bolivia the year 2020 all the companies were required to have a system of electronic billing, where the customers can can see all thier billings and see if all its alright.

This system has many modules:

-Inicio: where we can see all the progress with the billings incoming to our company and the state of ours and theirs services, with different indicators:
  1.Billings that were registered Online (realtime register in the Siat System).
  2.Billings that were registered Offline (registers after an error or issue with services in the Siat System).
  3.Register of CUFD (Unique Daily Billing Code by its acronym in Spanish).
  4.State of Services like Internet.
  5.If the Catalogue are syncronized with siat.
  6.State of Services of SIAT.
  7.Datetime of the SIAT servers.
  8.State of the local server services.
  9.Track by point of sale (Punto de venta) the number of registered billings of the current day.
  10.Valid CUFD used to register the billings.
-Autorizacion: Where we store the tokens and digital firms to autthenticate with siat.
-Mi empresa: where we can create new branches(Sucursales) and point of sales (Puntos de Venta).
-Sincronizacion: where the products and services are approved in SIAT with its respective catalog.
-Facturas Online(Online Billings)
-Facturas Offline(Offline Billings)
-Reports
-Configuration of Users and Roles used in the system
