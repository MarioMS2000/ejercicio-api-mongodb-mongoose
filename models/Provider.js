const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
    {
        company_name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        CIF: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        url_web: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Provider", providerSchema);