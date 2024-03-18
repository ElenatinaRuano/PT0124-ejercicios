//Lo primero es importar mongoose para poder crear un Schema

const mongoose = require("mongoose");


//Y al igual que hemos hecho con los campeones, creamos también un schema para las regiones

const RegionSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        image: {type: String, required: true},
        champions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Champion"}],
    },
    {
        timestamps : true,
    }
);


//Creamos el modelo de datos

const Region = mongoose.model("Region", RegionSchema);


//Por ultimo, exportamos el modulo

module.exports = Region;