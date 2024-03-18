//Los controladores consumen los modelos de datos por lo que lo primero es importar el modelo de datos que hemos creado
const { deleteImgCloudinary } = require("../../middleware/file.middleware");
const { enumGenderOk, enumRaceOk } = require("../../utils/enumOK");
const Champion = require ("../models/Champions.model");
const Region = require("../models/Regions.model");


//! ---> POST CREATE DE LOS CAMPEONES

const createChampion = async (req, res, next) => {
    /**Como PASO 0, camturamos la URL de la imagen que subimos a cloudinary
     * Esto es un metodo preventivo, en caso de que al ejecutar el controlador hay un error
    */
    let catchImg = req.file?.path;

    try {
        //*PASO 1: actualizar los index --> esto se hace por si se han producido cambios en el modelo, para sincronizarlo con el controlador
        await Champion.syncIndexes();

        //*PASO 2: instanciar un campeon, es decir, crear un nuevo campeon
        const newChampion = new Champion(req.body);
        /**Le damos como info inicial lo que recibimos en el req.body*/

        //*PASO 3: verificar si ha recibido correctamente la infomación de la imagen
        if(req.file){
            newChampion.image = catchImg; //si hay un archivo me traes el path de esa imagen
        }else{
            //si no me trae una imagen por defecto que hemos subido a cloudinary
            newChampion.image = "https://res.cloudinary.com/dhzpdwhsd/image/upload/v1708980598/imagen_profil.jpg"
        };

        //*PASO 4: guardamos la instancia de este nuevo campeon creado
        const saveChampion = await newChampion.save();

        //*PASO 5: devolver una respuesta en funcion de si se ha creado correctamente o no
        if (saveChampion) {
            // si se ha guardado >>> status 200 --- todo ok se ha guardado el campeon
            return res.status(200).json(saveChampion)
        } else {
            // si no se ha guardado >>> status 404 --- todo mal, no se ha guardado
            return res.status(404).json("❌ No se ha podido guardar el campeon en la DB ❌")
        }
    }   



    catch (error){
        /**En caso de que haya habido algun error entonces:
         * --> borramos la imagen de cloudinary porque va antes del controlador
         * --> devolvemos respuesta con el error en cuestion
         */
        req.file?.path && deleteImgCloudinary(catchImg);
        next(error);
        return (
            res.status(404).json({
                message: "❌ Error en la creación del campeon ❌",
                error: error,
            }) && next(error)
        );
    }
};




//! ---> GET BY ID : OBTENER UN CAMPEON POR SU ID

const getChampionById = async (req, res, next) => {
    try {
        //Requerimos la ID del campeon --> hacemos una peticion de la parametro ID
        const { id } = req.params;

        //Buscamos dentro de los campeones el ID mediante el metodo findById
        const championById = await Champion.findById(id);

        //Y comprobamos si ha encontrado al campeon o no
        return res
            .status(championById ? 200 : 400)
            .json(championById ? championById : "😱 No se ha encontrado un campeon con ese ID 😱")


    } catch (error) {
        return res.status(404).json({
            error:"😱 No se ha podido realizar la busqueda de campeon por ID 😱",
            message: error.message,
        });
    };
};




//! ---> GET ALL : OBTIENE TODOS LOS CAMPEONES DE LA DB

const getAllChampions = async (req, res, next) => {
    try {
        //Usamos el metodo find para buscar todos los camperones y almacenarlos en un parametro
        const allChampions = await Champion.find(); //.find nos devuelve un array

        //Si la longitud del array que nos devuelve es mayor que 0, entonces hay al menos un campeon
        if (allChampions.length > 0) {
            //En este caso nos devuelve todos los personajes en un array
            return res.status(200).json(allChampions);
        }else{
            //Si no encontró ni un solo campeon, lanzamos un error
            return res.status(404).json("😥 No se ha encontrado ningun campeon 😥");
        };

    } catch (error) {
        return res.status(404).json({
            error:"❌ No se ha podido realizar la busqueda de todos los campeones ❌",
            message: error.message,
        });
    };
};




//! ---> GET BY NAME : BUSCAR CAMPEON POR SU NOMBRE

const getChampionByName = async (req, res , next) => {
    try {
        const { name } = req.params;
        const championByName = await Champion.find({ name });

        if (championByName.length > 0) {
            return res.status(200).json(championByName);
        } else {
            return res.status(404).json("😥 No se ha podido encontrar un campeon con ese nombre 😥");
        }

    } catch (error) {
        return res.status(404).json({
            error:"❌ Error: no se ha podido realizar la busqueda por nombre ❌",
            message: error.message,
        });
    };
};




//! ---> PATCH UPDATE : PARA ACTUALIZAR LA INFORMACUON DE UN CAMPEON 

const updateChampion = async (req, res, next) => {
    
    //Empezamos capturando la imagen para poder manejar el file
    let catchImg = req.file?.path;

    try {
        //Sincronizacion de indices
        await Champion.syncIndexes();

        //Como hemos hecho anteriormente, buscamos por id
        const { id } = req.params;
        const championById = await Champion.findById(id);

        if(championById) {
            //Lo primero es almacenar la imagen existente, por si no hay cambio de imagen
            const oldImg = championById.image;

            /**Creamos un nuevo "body" donde en cada parametro preguntaremos si el usuario ha enviado nueva informacion
             *    ---> Si hay nueva información entonces la sustituimos por la nuev
             *    ---> Si no hay nueva información dejamos lo existente
             */
            const customBody = {
                _id: championById._id, //El ID será siempre el original, el usuario no lo puede cambiar
                name: req.body?.name ? req.body?.name : championById.name, //La interrogacion del body? es porque puede que nos envien esta informacion o puede que no
                ages: req.body?.ages ? req.body?.ages : championById.ages,
                image: req.file?.path ? catchImg : oldImg,
            };

            /**Vamos a comprobar que los parametros tipo "enum" se han pasado correctamente
             * Para ello llamamos al archivo enumOK.js:
             *    ---> Si es true: se ha elegido correctamente una de las opciones del enum
             *    ---> Si es false: no cambia el genero y deja el que estaba
             * Vamos ha hacer esto para el genero y para la raza
             */
            if(req.body?.gender){
                const resultEnum = enumGenderOk(req.body?.gender);
                customBody.gender = resultEnum.check
                    ? req.body?.gender
                    : championById.gender
            }

            if(req.body?.race){
                const resultEnum = enumRaceOk(req.body?.race);
                customBody.race = resultEnum.check
                    ? req.body?.race
                    : championById.race
            }


            /**Una vez hecho el customBody toca actualizar el campeon que hemos escogido por ID */

            try {
                //Con el metodo .findByIdAndUpdate podemos buscarlo y actualizarlo de una
                await Champion.findByIdAndUpdate(id, customBody);
                if (req.file?.path){
                    deleteImgCloudinary(oldImg); //Borramos la imagen anterior en caso de haber una nueva
                };

                //? --------------------------------------------------------------
                //? ----- TESTEO PARA VER SI EL CAMPEON SE HA ACTUALIZADO --------
                //? --------------------------------------------------------------

                //*PASO 1: buscamos el elemento actualizado por su ID
                const championByIdUpdate = await Champion.findById(id);

                //*PASO 2: sacamos las claves del req.body para saber que elemento hay almacenados, para ello usamos el metodo Object.keys(req.body)
                const elementUpdate = Object.keys(req.body);

                //*PASO 3: creamos un objeto vacio para el test donde ir metiendo las comparaciones entre el objeto actualizado y las peticiones del cliente
                let test = {};

                /**Vamos comparando cada una de las propiedades. Si ambas coinciden, importamos un "true" al objeto test,
                 * si no importamos un false.
                 * Para recorrer el objeto usamos un forEach
                 */

                elementUpdate.forEach((item) => {
                    if(req.body[item] == championByIdUpdate[item]){
                        test[item] = true;
                    }else{
                        test[item] = false;
                    }
                });

                //Ademas de las propiedades, comprobamos el path de la imagen:
                if(req.file){
                    championByIdUpdate.image == req.file?.path
                    ? (test = { ...test, file: true}) 
                    : (test = { ...test, file: false})
                };

                //*PASO 4: Comprobamos que en el array del test no hay ningun FALSE
                //Para ello primero creamos un contador y recorremos con un bucle todos las claves del objeto test
                let acc = 0;

                for (clave in test){
                    test[clave] == false && acc++; //Si encuentra algun false se añade 1 al contador
                }

                //Comprobamos si el contador es 0
                if (acc > 0) {
                    return res.status(404).json({
                        dataTest : test,
                        update: false,
                        champion:  championByIdUpdate,
                    });
                }else{
                    return res.status(200).json({
                        dataTest : test,
                        update: true,
                        champion:  championByIdUpdate,
                    })
                }
                
                //? ----------------------- FIN DEL TESTEO ------------------------
                

            } catch (error) {
                return (
                    res.status(404).json({
                        message: "❌ No se ha podido llevar a cabo la actualizacion del campeon ❌",
                        error: error.message,
                    }) && next(error)
                )
            }

        }else{
            return (
                res.status(404).json({
                    message: "❌ No existe ese campeon ❌",
                    error: error,
                }) && next(error)
            )
        }

    } catch (error) {
        return (
            res.status(404).json({
                message: "❌ No se ha podido encontrar ningún campeon con ese ID para actualizarlo ❌",
                error: error,
            }) && next(error)
        )
    }
};




//! --->  DELETE : PARA BORRAR UN OBJETO DE LA DB

const deleteChampion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const champion = await Champion.findByIdAndDelete(id);
        const imageToDelete = champion.image;

        deleteImgCloudinary(imageToDelete); //Borramos la imagen del campeon que deseamos eliminar para liberar espacio en la nube de Cloudinary

        //Una vez eliminado tenemos que comprobar si haciendoun test si se ha producido la actualizacion con exito

        if (champion){
            const findByIdChampion = await Champion.findById(id); //primero lo buscamos por ID para ver si existe

            try {
                //Recorremos la DB de regiones con "updateOne" para encontrar la region de ese campeon  y actualizarla
                const test = await Region.updateOne(
                    { champions: id },
                    { $pull: { champions: id }}
                );

                console.log(test); 

                //! ---> AQUI VA EL DELETE DE USER RECORDAAAAAAAAAAR

                return res
                .status(findByIdChampion ? 404 : 200)
                .json({deleteTest: findByIdChampion ? false : true});

            } catch (error) {
                return res.status(404).json({
                    error: "❌ Se ha producido un error en el update de Regiones ❌",
                    message: error.message,
                    });
            };
        };
    
    } catch (error) {
        return res.status(404).json({
            error: "❌ No se ha podido borrar el Campeon. Error en el catch ❌",
            message: error.message,
            });
    }
};




//Por último exportamos la funcion:
module.exports = { 
    createChampion, 
    getChampionById, 
    getAllChampions, 
    getChampionByName, 
    updateChampion,
    deleteChampion,
};