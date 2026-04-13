const errorHandler = (error, req, res, next) => {// Debe tener estos 4 parámetros en este orden para que Express lo reconozca como middleware de manejo de errores
    console.error(error);

    res.status(500).json({
        message: "Error interno del servidor",
        error: error.message,
    });
};

module.exports = errorHandler;