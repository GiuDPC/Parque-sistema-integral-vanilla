/**
 * ============================================
 * CONFIGURACIÓN DE BASE DE DATOS - MongoDB
 * ============================================
 * 
 * Este archivo maneja la conexión a nuestra base de datos MongoDB.
 * Usamos Mongoose como ODM (Object Document Mapper) que nos facilita
 * trabajar con MongoDB usando esquemas y modelos.
 * 
 * La URL de conexión viene de las variables de entorno (.env)
 * para mantener la seguridad y permitir diferentes configuraciones
 * en desarrollo y producción.
 */

const mongoose = require("mongoose");

/**
 * Conecta a la base de datos MongoDB
 * 
 * Esta función es asíncrona porque la conexión a la BD toma tiempo.
 * Si la conexión falla, el servidor no debería iniciar, por eso
 * hacemos exit(1) en caso de error.
 * 
 * @returns {Promise<void>}
 */
async function connectDB() {
  try {
    // Obtenemos la URL de MongoDB de las variables de entorno
    // Formato típico: mongodb://localhost:27017/brincapark
    // O para MongoDB Atlas: mongodb+srv://usuario:password@cluster.mongodb.net/brincapark
    await mongoose.connect(process.env.MONGO_URI, {
      // Estas opciones son recomendadas por Mongoose para evitar warnings
      useNewUrlParser: true,      // Usa el nuevo parser de URLs de MongoDB
      useUnifiedTopology: true,   // Usa el nuevo motor de gestión de conexiones
    });
    
    console.log("MongoDB conectado exitosamente");
    console.log(`Base de datos: ${mongoose.connection.name}`);
  } catch (err) {
    // Si no podemos conectar a la BD, mostramos el error y salimos
    // No tiene sentido que el servidor funcione sin base de datos
    console.error("Error conectando a MongoDB:", err.message);
    process.exit(1); // Código 1 indica que hubo un error
  }
}

// Exportamos la función para usarla en index.js
module.exports = connectDB;

