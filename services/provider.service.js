const Provider = require("../models/Provider"); // Importa el modelo de Provider (tu colección de proveedores en MongoDB usando Mongoose).

// Busca un proveedor por su nombre de empresa. Así lo quitas del controller y solo llamas a findProviderByCompanyName(...)
const findProviderByCompanyName = async (companyName) => {
    return await Provider.findOne({ company_name: companyName });// Provider.findOne(...) → busca un solo documento en la colección | { company_name: companyName } → filtra por ese campo
};

module.exports = {
    findProviderByCompanyName,
};