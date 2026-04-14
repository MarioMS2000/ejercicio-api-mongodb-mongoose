const express = require("express");
const router = express.Router(); // Crea un “mini servidor de rutas” dentro de Express. Creo un objeto router para definir rutas (GET, POST, etc.)

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products.controller");

// GET → obtener todos
// http://localhost:3000/api/products
router.get("/", getProducts);

// POST → crear
// http://localhost:3000/api/products
/*
{
  "title": "Nintendo Switch",
  "price": 299,
  "description": "Consola híbrida",
  "company_name": "Nintendo"
}
*/
router.post("/", createProduct);

// // PUT → actualizar
// http://localhost:3000/api/products
/*
{
  "title": "Nintendo Switch",
  "price": 279
}
 */
router.put("/", updateProduct);

// DELETE → borrar
// http://localhost:3000/api/products
/*

 */
router.delete("/", deleteProduct);

module.exports = router;