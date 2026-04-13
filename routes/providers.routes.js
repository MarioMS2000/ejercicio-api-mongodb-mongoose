const express = require("express");
const router = express.Router(); // Crea un “mini servidor de rutas” dentro de Express. Creo un objeto router para definir rutas (GET, POST, etc.)

const {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider,
} = require("../controllers/provider.controller");

// GET → obtener todos
router.get("/", getProviders);

// POST → crear
router.post("/", createProvider);

// PUT → actualizar
router.put("/", updateProvider);

// DELETE → borrar
router.delete("/", deleteProvider);

module.exports = router;