require("dotenv").config();// Carga las variables del .env

// Importaciones
const express = require("express"); // Servidor
const morgan = require("morgan"); // Logger (ver peticiones en consola)
const connectMongo = require("./config/db_mongo"); // Conecta a MongoDB

// Importas las rutas
const providersRoutes = require("./routes/providers.routes");
const productsRoutes = require("./routes/products.routes");

// Importas middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Crear servidor
const app = express(); // Inicializas la app
const PORT = process.env.PORT || 3000; // Usa el puerto del .env o 3000 por defecto

// Conectar a MongoDB
connectMongo(); // Ejecuta la conexión a la base de datos

// Middlewares globales | Muestra logs en consola: GET /api/products 200 12ms
app.use(morgan("dev"));
app.use(express.json()); // Permite leer req.body (JSON)

// Ruta de prueba -> Sirve para comprobar que el servidor funciona
app.get("/", (req, res) => {
    res.json({ message: "API MongoDB + Mongoose funcionando" });
});

// Rutas principales -> Conectas rutas con prefijo
/*
GET /api/providers
POST /api/providers
PUT /api/providers
DELETE /api/providers

GET /api/products
POST /api/products
PUT /api/products
DELETE /api/products
 */
app.use("/api/providers", providersRoutes);
app.use("/api/products", productsRoutes);

// Middleware
app.use(notFound); // Middleware notFound -> Si la ruta no existe → 404
app.use(errorHandler); // Middleware errorHandler -> Maneja errores (next(error))

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});