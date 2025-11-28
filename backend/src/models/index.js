/**
 * ============================================
 * ÍNDICE DE MODELOS
 * ============================================
 * 
 * Este archivo exporta todos los modelos de Mongoose para facilitar
 * su importación en otros archivos.
 * 
 * Nota: Este archivo originalmente estaba configurado para Sequelize (SQL),
 * pero el proyecto usa MongoDB con Mongoose. Se mantiene por compatibilidad
 * pero no es estrictamente necesario.
 */

const Reservation = require('./Reservation');
const Config = require('./Config');

// Exportamos los modelos para que puedan ser importados fácilmente
// Ejemplo de uso: const { Reservation, Config } = require('./models');
module.exports = { 
  Reservation,
  Config
};
