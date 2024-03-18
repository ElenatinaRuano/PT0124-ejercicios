//Requerimos modelos de datos Champions y Regions
const Region = require("../models/Regions.model");
const Champion = require("../models/Champions.model");


//! ----> POST CREATE DE LAS REGIONES

const createRegion = async (req, res, next) => {
    /**Como PASO 0, camturamos la URL de la imagen que subimos a cloudinary
    * Esto es un metodo preventivo, en caso de que al ejecutar el controlador hay un error
    */
    let catchImg = req.file?.path;

    try {
        //*PASO 1: actualizar los index
        await Region.syncIndexes();
        
        //*PASO 2: instanciar un campeon, es decir, crear un nuevo campeon
        const newRegion = new Region(req.body); //Creamos o instaciamos una nueva Region 
        


        //*PASO 3: verificar si ha recibido correctamente la infomación de la imagen
        if(req.file){
            newRegion.image = catchImg; //si hay un archivo me traes el path de esa imagen
        }else{
            //si no me trae una imagen por defecto que hemos subido a cloudinary
            newRegion.image = "https://res.cloudinary.com/dhzpdwhsd/image/upload/v1708980598/imagen_profil.jpg"
        };

        //*PASO 4: guardamos la instancia de esta nueva region creada
        const savedRegion = await newRegion.save(); //Guardamos la region creada


        //*PASO 5: devolver una respuesta en funcion de si se ha creado correctamente o no
        return res
            .status(savedRegion ? 200 : 400)
            .json(savedRegion ? savedRegion : "❌Error en el 'try' al crear una nueva región❌")

    } catch (error) {
        /**En caso de que haya habido algun error entonces:
         * --> borramos la imagen de cloudinary porque va antes del controlador
         * --> devolvemos respuesta con el error en cuestion
         */
        req.file?.path && deleteImgCloudinary(catchImg);
        next(error);
        return (
            res.status(404).json({
                message: "❌ Error en la creación de la region (ERROR CATCH) ❌",
                error: error,
            }) && next(error)
        );
    };
};



//! ----> PTCH: ADD Y DELETE UN CAMPEON DE UNA DE LAS REGIONES DE LA DB

const toggleChampion = async (req, res, next) => {
    try{
        //*PASO 1: creamos dos instancias:
        // --> una con el ID de la region que queremos modificar (req.params = parte de la route)
        // --> una don el ID del campeon que queremos incluir a la region (req.body = es info que pasamos a traves del body en insomnia)
        const { id } = req.params;
        const { champions } = req.body;
        //Y buscamos la ID de la pelicula para ver si esta existe
        const regionById = await Region.findById(id);

        //*PASO 2: un IF --> en caso de que exista hacemos el update, si no lanzamos error 404
        if (regionById) {
            /**Cogemos el string que traemos del body con la ID de un campeon y lo convertimos en un array,
             * separando siempre con una coma --> para ello usamos el metodo SPLIT
             */

            const arrayIdChampions = champions.split(",");

            //*PASO 3: Recorremos el array, y para cada item del array hacemos la siguiente comprobacion:
            /**
             * 1) ---> extraer el campeon si este ya existia
             * 2) ---> añadir el campeon si este no existia aun
             */

            Promise.all(
                arrayIdChampions.map(async(champion, index) => {
                    if (regionById.champions.includes(champion)){ //si esa region incluye el campeon
                        //*BORRAR DEL ARRAY DE CAMPEONES, EL CAMPEON QUE YA EXISTE EN ESA REGION

                        try { //Actualizamos la region
                            await Region.findByIdAndUpdate(id, {
                                $pull: {champions: champion},
                            });

                            try { //Actualizar el campeon
                                await Champion.findByIdAndUpdate(champion, {
                                    region : null
                                });

                            } catch (error) { //Error al actualizar el campeon
                                res.status(404).json({
                                    error: "❌ Ha habido un error al actualizar la region del campeon ❌",
                                    message: error.message,
                                    });
                            }

                        } catch (error) { //Error al actualizar la region
                            res.status(404).json({
                                error: "❌ Ha habido un error al actualizar los campeones de la region ❌",
                                message: error.message,
                                });
                        }
                    }else{
                        //*INCLUIR EL CAMPEON EN LA REGION SI ESTE AUN NO EXISTE
                        try {
                            await Region.findByIdAndUpdate(id, {
                                $push: {champions: champion},
                            });

                            try { //Actualizar el campeon
                                await Champion.findByIdAndUpdate(champion, {
                                    region : id
                                });

                            } catch (error) { //Error al actualizar el campeon
                                res.status(404).json({
                                    error: "❌ Ha habido un error al actualizar la region del campeon ❌",
                                    message: error.message,
                                    });
                            }
                        } catch (error) {
                            res.status(404).json({
                                error: "❌ Ha habido un error al actualizar los campeones de la region ❌",
                                message: error.message,
                                });
                        }
                    }
                })
            )
            .catch((error) => res.status(404).json(error.message))
            .then(async () => {
                return res.status(200).json({
                    dataUpdate: await Region.findById(id).populate("champions"),
                });
            });

        }else{
            return res.status(404).json("😪 La pelicula que buscas con esa ID no existe en la DB 😪");
        };


    } catch (error) {
        return (
            res.status(404).json({
                error: "❌ Ha habido un error en el TOOGLE. Error CATCH ❌",
                message: error.message,
            }) && next(error)
        );
    }
};

//Exportamos los modulos para poder llamarlos en las rutas

module.exports = { createRegion, toggleChampion };