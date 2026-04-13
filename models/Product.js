const mongoose = require("mongoose"); // Aquí cargamos Mongoose, es la librería que permite trabajar con MongoDB de forma estructurada

// El Schema (la estructura del producto) -> aquí definimos como debe ser un producto en la base de datos
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true, // no puede repetirse (como un nombre único)
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0, // No puede ser negativo
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        provider: {
            // Esto crea una relación con otro modelo (como una foreign key en SQL) → Es como decir, este producto pertenece a un proveedor
            type: mongoose.Schema.Types.ObjectId, // ObjectId → guarda el ID de otro documento 
            ref: "Provider", // Apunta al modelo Provider
            required: true,
        },
    },
    {
        timestamps: true, // Añade automáticamente → createdAt yupdatedAt
        versionKey: false,// Elimina el campo __v (control de versiones de MongoDB)
    }
);

// Aquí creamos el modelo "Product", te permite hacer Product.find(), Product.create(), Product.findById()
module.exports = mongoose.model("Product", productSchema);