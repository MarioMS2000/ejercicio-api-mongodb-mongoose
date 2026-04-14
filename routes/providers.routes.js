const express = require("express");
const router = express.Router(); // Crea un “mini servidor de rutas” dentro de Express. Creo un objeto router para definir rutas (GET, POST, etc.)

const {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider,
} = require("../controllers/providers.controller");

// GET → obtener todos
// http://localhost:3000/api/providers
router.get("/", getProviders);

// POST → crear
// http://localhost:3000/api/providers
/*
{
  "company_name": "Nintendo",
  "CIF": "B12345678",
  "address": "Kyoto",
  "url_web": "https://www.nintendo.com"
}
 */
router.post("/", createProvider);

// PUT → actualizar
// http://localhost:3000/api/providers
/*
{
  "company_name": "Nintendo",
  "address": "Kyoto, Japan"
}
 */
router.put("/", updateProvider);

// DELETE → borrar
// http://localhost:3000/api/providers
// Solo puedes borrar proveedores que no tengan productos asociados
/*
{
  "company_name": "Nintendo"
}
*/
router.delete("/", deleteProvider);

module.exports = router;