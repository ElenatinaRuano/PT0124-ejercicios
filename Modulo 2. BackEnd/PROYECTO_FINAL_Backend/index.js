//Requerimos express y dotenv
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


//Lo primero es conectarse a la base de datos. Para ello llamamos a la funcion de conexion
//La requerimos llamando a la carpeta donde encontramos el archivo db.js
const { connect } = require("./src/utils/db");
connect (); //Una vez importada llamos a la funcion


//De la misma manera, llamamos a la configuración de cloudinary
const { configCloudinary } = require("./src/middleware/file.middleware");
configCloudinary();


//Creamos un puerto --> para ello usamos variables de entorno
const PORT = process.env.PORT;


//Creamos el puerto directamente haciendo uso de express
const app = express();


//Añadimos limitaciones de cantidad en el servidor
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit: "5mb", extended:false}));


//Requerimos las rutas:
//Ruta para los usuarios
const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/users/", UserRoutes);

//Ruta para la creacion de Campeones
const ChampionRoutes = require("./src/api/routes/Champions.routes");
app.use("/api/v1/champions/", ChampionRoutes);

//Ruta para la creacion de Regions
const RegionRoutes = require("./src/api/routes/Regions.routes");
app.use("/api/v1/regions/", RegionRoutes);


//Añadimos tambien la respuesta a los distintos errores:
//ERROR (404) --> NO SE ENCUENTRA RUTA (error de user o cliente)
app.use("*", (req,res,next) => {
    const error = new Error("❌ Route not found ❌");
    error.status = 404;
    return next(error);
});

//ERROR (500) --> NO FUNCIONA EL SERVIDOR (chrased server)
app.use((error, req, res) => {
    return res
    .status(error.status || 500)
    .json(error.message || "❌ Unexpected error ❌") 
});



//Escuchamos al servidor haciendo uso del puerto creado
app.listen(PORT, () => {
    console.log(`Server listening on port "http://localhost${PORT}`);
});