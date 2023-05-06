export var versionOficial = "1.0.X";
export var abouts: object = [
    {
        version:"1.0.1",
        fecha:"02 febrero 2022",
        descripcion: [
            { name: "Registro de evento significativo, mejoras en el formulario de registro de eventos significativo.", modulo: "" },   
            { name: "Registro de evento significativo, de acuerdo a la norma se modifico el registro de contingencia hacia 48 horas (2 dias) pasados de CUFD.", modulo: "" },
            { name: "Cuadro de facturas, mejora el cuadro de facturas de On lin y off line de todas las recepciones y envios a los servicios de SIAT.", modulo: "" },
            { name: "Homologación de productos, se agrego un nuevo estado a los productos \"Estado Activo e Inactivo\" para dar de baja a los productos no utilizados o que fueron bloqueados.", modulo: "" },               
            { name: "Homologación de productos, mejora en la velocidad de registro de homologacion de productos.", modulo: "" },
            { name: "Homologación de productos, se agrego por de tras del SIFE la homologación masiva de productos.", modulo: "" },  
            { name: "Catalogo de productos, se mejoro el listado de catalogos para un mejor entendiemiento de la relacion de catalogo producto con actividad económica.", modulo: "" },  
            { name: "Envio de facturas a SIAT, se mejoro el tratamiento de facturas hacia Impuestos Nacionales con un promedio de una factura autorizada de mas menos 897 milisegundos por facturas.", modulo: "" },               
            { name: "SIFE, mejora en el diseño de resumen de facturas y formularios de contingencia.", modulo: "" },     
        ]
    },
    {
        version:"1.0.0",
        fecha:"01 diciembre 2021",
        descripcion: [
            { name: "Emisor de Facturas Digitales, genera Facturas Digitales en formato XML para las modalidades Electrónica en Línea posee la emisión individual y por contingencia", modulo: "" },
            { name: "Emisión de Paquetes por Contingencia, Cuando el Sistema Informático de Facturación autorizado tenga un evento de contingencia que obligue a la emisión de facturas fuera de línea (offline), almacenará las mismas en paquetes de máximo 500 Facturas. Posterior a la recuperación del evento de contingencia, el Sistema Informático deberá registrar el mismo a través del Servicio Web habilitado para el efecto y proceder al envío de los paquetes consumiendo para ello los servicios correspondientes.", modulo: "" },

            { name: "Gestor de  Facturas Digitales, Su función principal es enviar y validar transacciones de registro como la anulación de las Facturas.", modulo: "" },
            { name: "Sincronización de catálogos, Funcionalidad que permite la descarga y actualización de los diferentes catálogos del Sistema de Facturación, códigos de productos y servicios, países, códigos de eventos significativos, códigos de mensajes de servicios y otros. La sincronización de catálogos se realizará de forma diaria.", modulo: "" },
            { name: "Sincronización de fecha y hora, la sincronización de la fecha y hora de los Sistemas Informáticos de Facturación (Contribuyente) con la fecha y hora de la Administración Tributaria. Esta sincronización será utilizada para realizar los controles de plazos de envíos y registros en las diferentes casuísticas de emisión de Facturas Digitales. La sincronización puede ser realizada varias veces al día, recomendándose se la efectúe antes de la obtención del Código Único de Facturación Diaria - CUFD.", modulo: "" },
            { name: "Registro de eventos significativos, Los eventos significativos son hechos inherentes al Sistema informático de Facturación que intervienen en su funcionamiento o que podrían afectar la emisión de las Facturas Digitales. Deben ser registrados hasta 48 horas posteriores de finalizada la contingencia, a través del sistema autorizado por la Administración Tributaria y enviados automáticamente a través del servicio Web correspondiente.", modulo: "" },
            { name: "Gestor de envío de documentos digitales e impresión:", modulo: "" },

            { name: "Módulo Registro de Firmas del contribuyente en formatos .pem y .cer.", modulo: "Firmas" },
            { name: "Módulo de registrar el Token obtenido con Impuestos Nacionales en la oficina virutal.", modulo: "Token" },
            { name: "Módulo de los codigos de Autorizacion del sistema de Impuestos Nacionales.", modulo: "" },
            { name: "Módulo de Configuración de variables globales para el funcionamiento del sistema.", modulo: "" },
            { name: "Módulo Empresa, gestiona el registro de sucursales y puntos de venta contra Impuestos Nacionales.", modulo: "" },
            { name: "Módulo CUFD solicita los Códigos Únicos de Facturación Diaria a Impuestos Nacionales por Punto de Venta.", modulo: "" },
            { name: "Módulo Valida nit, verifica los nits del cliente ante Impuestos Nacionales.", modulo: "" },
            
            ]
    },
    {
        version:"0.0.2",
        fecha:"15 septiembre 2021",
        descripcion: [
            { name: "Emisor de Facturas Digitales, permite generar Facturas Digitales en formato XML para las modalidades Electrónica en Línea", modulo: "Firmas" },
            { name: "Gestor de  Facturas Digitales, su función principal es enviar y validar transacciones de registro como la anulación de las Facturas. En el apartado correspondiente a la implementación de Servicios de Facturación se muestra en detalle la implementación de los mismos, y el apartado de Archivos XML/XSD de Facturas contiene una descripción detallada de cada tipo de documento sector a ser gestionado", modulo: "Firmas" },
            { name: "Sincronización de catálogos, permite la actualización de los diferentes catálogos del Sistema de Facturación, códigos de productos y servicios, países, códigos de eventos significativos, códigos de mensajes de servicios y otros. La sincronización de catálogos se realizará de forma diaria", modulo: "Firmas" },
            { name: "Sincronización de fecha y hora, permite la sincronización de la fecha y hora de los Sistemas Informáticos de Facturación (Contribuyente) con la fecha y hora de la Administración Tributaria. Esta sincronización será utilizada para realizar los controles de plazos de envíos y registros en las diferentes casuísticas de emisión de Facturas Digitales.", modulo: "Firmas" },
            { name: "Tipos de documento sector definidos, - Compra y venta, - Recibo de Alquiler bienes inmuebles, - Factura de comercial exportación", modulo: "Firmas" },
        ]
    },
    {
        version:"0.0.1",
        fecha:"01 agosto 2021",
        descripcion: [
            { name: "Emisor de Facturas Digitales, permite generar Facturas Digitales en formato XML para las modalidades Electrónica en Línea", modulo: "Firmas" },
            { name: "Gestor de  Facturas Digitales, su función principal es enviar y validar transacciones de registro como la anulación de las Facturas. En el apartado correspondiente a la implementación de Servicios de Facturación se muestra en detalle la implementación de los mismos, y el apartado de Archivos XML/XSD de Facturas contiene una descripción detallada de cada tipo de documento sector a ser gestionado", modulo: "Firmas" },
            { name: "Sincronización de catálogos, permite la actualización de los diferentes catálogos del Sistema de Facturación, códigos de productos y servicios, países, códigos de eventos significativos, códigos de mensajes de servicios y otros. La sincronización de catálogos se realizará de forma diaria", modulo: "Firmas" },
            { name: "Sincronización de fecha y hora, permite la sincronización de la fecha y hora de los Sistemas Informáticos de Facturación (Contribuyente) con la fecha y hora de la Administración Tributaria. Esta sincronización será utilizada para realizar los controles de plazos de envíos y registros en las diferentes casuísticas de emisión de Facturas Digitales.", modulo: "Firmas" },
            { name: "Tipos de documento sector definidos, - Compra y venta, - Recibo de Alquiler bienes inmuebles, - Factura de comercial exportación", modulo: "Firmas" },
            { name: "Registro de eventos significativos o contingencias en el caso de ocurrir un problema en el sistema SIFE o con la Administración tributaria.", modulo: "Firmas" },
            { name: "Registro de eventos significativos o contingencias en el caso de ocurrir un problema en el sistema SIFE o con la Administración tributaria.", modulo: "Firmas" },
        ]
    }
];

