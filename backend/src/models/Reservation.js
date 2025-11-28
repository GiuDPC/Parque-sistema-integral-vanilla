/**
 * ============================================
 * MODELO DE RESERVA - MongoDB/Mongoose
 * ============================================
 * 
 * Este modelo define la estructura de datos para las reservas de BRINCAPARK.
 * Cada reserva representa una solicitud de un cliente para usar el parque
 * en una fecha y hora específica.
 * 
 * El modelo usa Mongoose Schema para definir:
 * - Qué campos tiene cada reserva
 * - Qué tipo de dato es cada campo
 * - Qué campos son obligatorios
 * - Qué valores son válidos (validaciones)
 */

const mongoose = require("mongoose");

/**
 * Schema (esquema) de Reserva
 * Define la estructura de cada documento de reserva en MongoDB
 */
const ReservationSchema = new mongoose.Schema({
  // ============================================
  // INFORMACIÓN DEL CLIENTE
  // ============================================
  
  /**
   * Nombre completo del cliente
   * Ejemplo: "Juan Pérez"
   */
  nombreCompleto: { 
    type: String, 
    required: true 
  },

  /**
   * Correo electrónico del cliente
   * Usado para enviar confirmaciones y comunicación
   * Ejemplo: "juan@example.com"
   */
  correo: { 
    type: String, 
    required: true 
  },

  /**
   * Número de teléfono del cliente
   * Usado para contacto directo
   * Ejemplo: "+58 414-1234567"
   */
  telefono: { 
    type: String, 
    required: true 
  },

  // ============================================
  // DETALLES DE LA RESERVA
  // ============================================

  /**
   * Tipo de paquete seleccionado
   * Opciones: "mini", "mediano", "full"
   * - mini: hasta 30 personas
   * - mediano: hasta 60 personas
   * - full: hasta 80 personas
   */
  paquete: { 
    type: String, 
    required: true 
  },

  /**
   * Fecha del servicio
   * Formato: "YYYY-MM-DD" (ejemplo: "2025-12-25")
   * Se guarda como String para evitar problemas de zona horaria
   */
  fechaServicio: { 
    type: String, 
    required: true 
  },

  /**
   * Horario de la reserva
   * El parque opera en 3 turnos diarios
   * - Mañana: 10am-1pm
   * - Tarde: 2pm-5pm
   * - Noche: 6pm-9pm
   * 
   * Solo se permite un evento por turno en cada parque
   */
  horaReservacion: {
    type: String,
    required: true,
    enum: ["10am-1pm", "2pm-5pm", "6pm-9pm"], // Solo estos valores son válidos
  },

  /**
   * Parque donde se realizará el evento
   * BRINCAPARK tiene 3 ubicaciones en Venezuela
   */
  parque: {
    type: String,
    required: true,
    enum: ["Maracaibo", "Caracas", "Punto Fijo"], // Solo estos parques existen
  },

  /**
   * Estado/región donde vive el cliente
   * Ejemplos: "Zulia", "Falcón", "Miranda"
   * Usado para estadísticas de origen de clientes
   */
  estadoUbicacion: { 
    type: String, 
    required: true 
  },

  /**
   * Tipo de evento que se celebrará
   * Ejemplos: "Cumpleaños", "Fiesta escolar", "Evento corporativo"
   * Usado para estadísticas y personalización del servicio
   */
  tipoEvento: { 
    type: String, 
    required: true 
  },

  // ============================================
  // ESTADO ADMINISTRATIVO
  // ============================================

  /**
   * Estado de la reserva (gestionado por el admin)
   * - "pendiente": Recién creada, esperando aprobación
   * - "aprobado": Confirmada por el administrador
   * - "cancelado": Rechazada o cancelada
   * 
   * Por defecto, toda reserva nueva es "pendiente"
   */
  estadoReserva: {
    type: String,
    enum: ["pendiente", "aprobado", "cancelado"],
    default: "pendiente",
  },

  // ============================================
  // METADATA
  // ============================================

  /**
   * Fecha y hora en que se creó la reserva
   * Se genera automáticamente cuando se crea el documento
   * Útil para ordenar reservas y generar reportes
   */
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Creamos y exportamos el modelo
// "Reservation" es el nombre del modelo (se guardará como "reservations" en MongoDB)
module.exports = mongoose.model("Reservation", ReservationSchema);

