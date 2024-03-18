//Imporación de la creacion de la Region y del modelo de Region
const { upload } = require("../../middleware/file.middleware");
const { createRegion, toggleChampion } = require("../controllers/Regions.controllers");


//Importamos tambien el router
const RegionRoutes = require("express").Router();


//Y creamos las rutas
RegionRoutes.post("/", upload.single("image"), createRegion);
RegionRoutes.patch("/toggle/:id", toggleChampion);


//Finalmente, exportamos la ruta para usarla en el index
module.exports = RegionRoutes;