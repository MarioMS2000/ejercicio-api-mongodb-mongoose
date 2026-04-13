const express = require("express");
const router = express.Router(); // Crea un “mini servidor de rutas” dentro de Express. Creo un objeto router para definir rutas (GET, POST, etc.)

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products.controller");

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

module.exports = router;