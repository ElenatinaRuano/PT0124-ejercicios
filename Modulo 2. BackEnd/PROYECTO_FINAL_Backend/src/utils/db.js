//Requerimos dotenv y mogoose
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Desde la pagina de MONGODB creamos un proyecto --> ModeloDatosCloudinary
//Activamos el server para nuestra base de datos Cluster0 --> la contraseña generada es la que usamos en nuestro como variables de entorno en el archivo .env
//Hacemos lo mismo con cloudinary, creamos las correspondientes variables de entorno en el archivo .env

//Traemos la mongo URI
const MONGO_URI = process.env.MONGO_URI;

//Creamos la función asincrona para conectar la DB con mongoDB
const connect = async() => {
    //Manejamos la conexión y los errores con try / catch

    try {
        const db = await mongoose.connect(MONGO_URI, {
            //parsear la url de mongo, la mongo_uri
            useNewUrlParser: true,
            //unificar los caracteres especiales
            useUnifiedTopology: true
        });

        const { name, host } = db.connection;

        console.log (`🎉 Conectada la DB con el HOST: ${host} y el name: ${name} 🎉`);
    }

    catch (error) {
        console.log("😢 Hay un error en la conexión con la DB 😢", error);
    }
};

//Por ultimo, exportamos la funcion de conexcion

module.exports = { connect };