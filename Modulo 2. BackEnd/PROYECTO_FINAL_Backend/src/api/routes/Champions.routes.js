//Como siempre empezamos requiriendo las librerias que necesitamos usar
const { upload } = require("../../middleware/file.middleware");
const { createChampion, getChampionById, getAllChampions, getChampionByName, updateChampion, deleteChampion } = require("../controllers/Champions.controllers");

//Importamos tambien el router 
const ChampionRoutes = require("express").Router();

/**Usamos el metodo .post, el endpoint y la funcion que queremos ejecutar (create en este caso)
 * extra upload de clodinary
*/
ChampionRoutes.post("/", upload.single("image"), createChampion);
ChampionRoutes.get("/byID/:id", getChampionById);
ChampionRoutes.get("/byName/:name", getChampionByName);
ChampionRoutes.get("/", getAllChampions);
ChampionRoutes.patch("/:id", upload.single("image"), updateChampion);
ChampionRoutes.delete("/delete/:id", deleteChampion);


//Por ultimo como siempre exportamos la funcion
module.exports = ChampionRoutes;

