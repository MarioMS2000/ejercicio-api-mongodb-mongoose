// Importamos Provider y Product con Mongoose
const Provider = require("../models/Provider"); // Esta variable guarda el documento que se acaba de guardar en la base de datos
const Product = require("../models/Product");

// GET
const getProviders = async (req, res, next) => {// next -> Express automáticamente va a un middleware especial de errores (Ha ocurrido un error → pásalo al manejador de errores que estan en middelwares)
    try {
        const providers = await Provider.find();
        res.status(200).json(providers);
    } catch (error) {
        next(error);
    }
};

// POST
const createProvider = async (req, res, next) => {
    try {
        const provider = await Provider.create(req.body); // req.body -> Porque los datos que envía el cliente vienen en req.body | El objeto que contiene los datos enviados en una petición HTTP (POST o PUT)

        res.status(201).json({
            message: "proveedor creado",
            provider,
        });
    } catch (error) {
        next(error);
    }
};

// PUT
const updateProvider = async (req, res, next) => {
    try {
        const { company_name } = req.body;// Guardamos del body el company_name

        // Busca un proveedor → { company_name }, lo actualiza → con req.body y devuelve el resultado
        const updatedProvider = await Provider.findOneAndUpdate(
            { company_name },
            req.body,
            { new: true, runValidators: true } // new: true → devuelve el documento actualizado | runValidators: true → valida los datos del schema
        );

        // Si no existe un proovedor
        if (!updatedProvider) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        

        res.status(200).json({
            message: `proveedor actualizado: ${updatedProvider.company_name}`,// Mete el nombre actualizado dentro del texto
            provider: updatedProvider,// Devuelve el objeto actualizado completo
        });
    } catch (error) {
        next(error);
    }
};

// DELETE
const deleteProvider = async (req, res, next) => {
    try {
        const { company_name } = req.body;

        const provider = await Provider.findOne({ company_name }); // Busca proovedor

        // Si no lo encuentra
        if (!provider) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        // Busca productos que tengan ese provider
        const relatedProducts = await Product.find({ provider: provider._id });// Busca todos los productos cuyo campo provider sea igual a este _id
        // provider: -> es el nombre del campo de la base de datos en el modelo Product y provider._id -> es su identificador único

        // Si este proveedor tiene productos → NO lo borres
        if (relatedProducts.length > 0) {
            return res.status(409).json({
                message: "No se puede borrar el proveedor porque tiene productos asociados",
            });
        }

        // Cuando el proovedor no tiene productos, si se puede borrar y hace esto
        await Provider.deleteOne({ _id: provider._id });// Borra el proovedor de la BBDD, es decir el proveedor cuyo _id sea este

        res.status(200).json({
            message: `Se ha borrado el proveedor: ${provider.company_name}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider,
};