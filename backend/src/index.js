/**
 * BRINCAPARK - Servidor Backend Principal
  Este es el punto de entrada de nuestra API. Aquí configuramos Express,
  conectamos a MongoDB y montamos todas las rutas de la aplicación.
 
 Flujo de inicio:
  1. Cargar variables de entorno (.env)
  2. Configurar middlewares (JSON parser, CORS)
  3. Montar rutas de la API
  4. Conectar a MongoDB
  5. Iniciar servidor HTTP
 */

// Primero cargamos las variables de entorno del archivo .env
// Esto nos permite tener configuraciones diferentes para desarrollo y producción
require("dotenv").config();

// Importamos Express - nuestro framework web para Node.js
const express = require("express");
const app = express();

// CORS nos permite que el frontend (que corre en otro puerto) pueda hacer peticiones a nuestra API
const cors = require("cors");

// Función que conecta a nuestra base de datos MongoDB
const connectDB = require("./config/db");

// ============================================
// IMPORTAR RUTAS
// ============================================
// Cada archivo de rutas maneja un conjunto específico de endpoints
const reservationsRoute = require("./routes/reservations"); // Rutas públicas de reservas
const adminRoute = require("./routes/admin");               // Rutas administrativas (requieren autenticación)
const configRoute = require("./routes/config");             // Rutas de configuración del sistema

// ============================================
// MIDDLEWARES GLOBALES
// ============================================
// Los middlewares son funciones que procesan cada petición antes de llegar a las rutas

// express.json() convierte el body de las peticiones JSON en objetos JavaScript
// Sin esto, req.body sería undefined
app.use(express.json());

// CORS permite que navegadores acepten peticiones desde otros dominios/puertos
// En producción, deberías configurar esto para aceptar solo tu dominio específico
app.use(cors());

// ============================================
// MONTAR RUTAS
// ============================================
// Aquí "montamos" nuestras rutas en diferentes paths base
// Por ejemplo, todas las rutas en reservationsRoute estarán bajo /api/reservations

app.use("/api/reservations", reservationsRoute); // Ej: POST /api/reservations, GET /api/reservations
app.use("/api/admin", adminRoute);                // Ej: GET /api/admin/reservations
app.use("/api/config", configRoute);              // Ej: GET /api/config, PUT /api/config

// ============================================
// HEALTH CHECK
// ============================================
// Ruta simple para verificar que el servidor está funcionando
// Útil para monitoreo y debugging
app.get("/", (req, res) => res.send("Backend BRINCAPARK - funcionando"));

// ============================================
// INICIAR SERVIDOR
// ============================================
// Obtenemos el puerto de las variables de entorno, o usamos 4000 por defecto
const PORT = process.env.PORT || 4000;

// Usamos una función async para poder esperar la conexión a MongoDB
(async () => {
  try {
    // Primero conectamos a MongoDB - si esto falla, no tiene sentido iniciar el servidor
    await connectDB();
    
    // Una vez conectados a la BD, iniciamos el servidor HTTP
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    // Si algo sale mal (generalmente la conexión a MongoDB), mostramos el error
    console.error("Error iniciando servidor:", err);
    // Salimos del proceso con código 1 (indica error)
    // Esto es importante para que servicios como PM2 o Docker sepan que algo falló
    process.exit(1);
  }
})();
