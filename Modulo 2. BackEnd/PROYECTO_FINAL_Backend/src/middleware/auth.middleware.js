//Importamos librerias necesarias

const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();


/**El middleware está entre el usuario y el backend
 * Vamos a usarlo para verificar que la persona que intenta acceder, está autorizada a hacerlo
 * Esto vamos a hacerlo usando TOKEN ---> instalamos libreria jswon web token (JWT)
 */


//! ---> FUNCION DE AUTENTIFICACIÓN

const isAuth = async (req, res, next) => {
    //*PASO 1: accedemos a la informacion del HEADER (info interna que "no se ve"), se envia el token como un Bearer token
    /** Bearer token ---> son una clase general de token que otorga acceso a la parte que posee el token
     * Vamos a aplicar un metodo replace al BEARER por un string vacio para que luego json web token me lo reconozca sin la palabra Bearer.
    */

    const token = req.headers.authorization?.replace("Bearer ", "");

    //*PASO 2: condicional ---> si no existe el token entonces denegamos acceso
    if (!token){
        return next(new Error("❌ No esta autorizado ❌"));
    }

    //*PASO 3: verificación del TOKEN usando la función verityToken ---> utils/token.js
    /**Vamos a verificar la clave JWT, la cual generamos nosotros y la guardamos en el documento .ENV */
    try {
        // verityToken() ---> nos dvuelve la informacion que le dimos para crear el token (email, id) 
        // y lo metemos en decoded ---> que lo que tiene dentro es un OBJETO con el email y el id { email, id }
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        /** Hacemos una petición en el body para verificar que usuario esta autentificado en este momento
         * Al haber decodificado el token podemos buscar el usuario con el ID
         * req.user nos va a servir para saber que ese es un usuario autenticado
         */
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(error);
    }

};



//! ---> VER SI EL USUARIO ES EL ADMINISTRADOR
/**Usamos de nuevo el TOKEN ---> lo decodificamos y extraemos el mail y el ID para poder veridicar en los datos del usuario si es admin o no */

const isAuthAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return next(new Error("Unauthorized"));
    }

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        // cuando decodifico el token saco el id y el email
        console.log(decoded);
        req.user = await User.findById(decoded.id);

        // pongo un requisito mas y es que sea admin
        if (req.user.rol !== "admin") {
        return next(new Error("❌ Acción denegada, este usuario no es administrador ❌"));
        }
        next();
    } catch (error) {
        return next(error);
    }
};



module.exports = {
    isAuth,
    isAuthAdmin,
};