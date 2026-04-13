const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MY_MONGO_URI);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
        process.exit(1);// Es una instrucción de Node.js que sirve para terminar el proceso de ejecución inmediatamente.
    }
};

module.exports = connectMongo;