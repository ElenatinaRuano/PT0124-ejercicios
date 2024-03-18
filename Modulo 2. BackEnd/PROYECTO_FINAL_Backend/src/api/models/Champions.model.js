//Requerimos mongoose para ahjcer uso de la parte de esquemas de datos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Creamos un esquema de datos para nuestros campeones de League of Leyends
const ChampionsSchema = new Schema (
    {
        name: {type:String, required:true, unique:true},
        gender: {
            type: String,
            enum: ["masculino", "femenino", "otro"],
            require: false,
        },
        race: {
            type: String,
            enum: ["ascendidos", "celestiales", "cyborgs", "darkins", "demonios", "humanos", "minotauros", "criaturas del vacio", "nacidos en el hielo", "putoto", "renacidos", "vastaya", "yeti", "yordles"],
            require: true,
        },
        ages: {
            type: Number,
            require: false,
        },
        image: {type: String, required: true},
        region: { type: mongoose.Schema.Types.ObjectId, ref: "Region"},
    },
    {
        timestamps: true, // guarda el momento - fecha hora ... - en el que se ha creado la db
    }
);

//Una vez definido el esquema de tipos de datos, creamos el modelo de datos
const Champion = mongoose.model("Champion", ChampionsSchema);


//Por último, exportamos el modelo de datos para ser consumido por los controladores
module.exports = Champion;
