const Product = require("../models/Product");
const Provider = require("../models/Provider");

// GET
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate("provider");
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// POST
const createProduct = async (req, res, next) => {
    try {
        const { title, price, description, company_name } = req.body;

        const provider = await Provider.findOne({ company_name });

        if (!provider) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        const product = await Product.create({
            title,
            price,
            description,
            provider: provider._id,
        });

        res.status(201).json({
            message: "producto creado",
            product,
        });
    } catch (error) {
        next(error);
    }
};

// PUT
const updateProduct = async (req, res, next) => {
    try {
        const { title, company_name, ...rest } = req.body; // ...rest = todo lo demás lo guardas en rest

        let updateData = { ...rest }; // Creamos un objeto con todo lo que esta en ...rest

        // Cambiar el proveedor del producto si el cliente lo pide
        // Si me mandas un company_name, busco ese proveedor y guardo su _id en el producto
        // Si el cliente ha enviado company_name en el body entra
        if (company_name) {
            const provider = await Provider.findOne({ company_name });// Busca en la BD un proveedor con ese nombre

            // Si no tiene proveedor
            if (!provider) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }

            // Si el cliente ha enviado company_name y el proveedor existe, guardamos su _id en el campo provider del producto
            updateData.provider = provider._id; // updateData.provider -> añade (o modifica) la propiedad 'provider' dentro del objeto updateData y en este caso guarda el _id del provider
        }

        // Si no hay proveedor solo actualiza el precio ya que el if anterior no entra
        // Actualiza el producto con TODOS los datos que haya en updateData
        const updatedProduct = await Product.findOneAndUpdate(
            { title },// Busca por titulo
            updateData,// Actualiza con estos campos
            { new: true, runValidators: true } // new: true → devuelve el actualizado y runValidators: true → valida datos
        ).populate("provider");// Sustituye el provider (id) por el objeto completo

        // Si NO se ha encontrado ningún producto para actualizar → devuelve error
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Si todo va bien haz esto
        res.status(200).json({
            message: `producto actualizado: ${updatedProduct.title}`,
            product: updatedProduct, // En el product mete el objeto actualizado
            // Quedaría así:
            /*
                {
                "message": "producto actualizado: iPhone 15",
                "product": {
                    "_id": "123",
                    "title": "iPhone 15",
                    "price": 1500,
                    "provider": {
                    "_id": "AAA123",
                    "company_name": "Apple"
                    }
                }
                }
             */
        });
    } catch (error) {
        next(error);
    }
};

// DELETE
const deleteProduct = async (req, res, next) => {
    try {
        const { title } = req.body;// Extraemos el campo 'title' del body de la petición

        const deletedProduct = await Product.findOneAndDelete({ title }); // Busca un producto con ese title y lo borra

        // Si no existe el producto eliminado
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Si lo encuentra entonces hace esto
        res.status(200).json({
            message: `Se ha borrado el producto: ${deletedProduct.title}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};