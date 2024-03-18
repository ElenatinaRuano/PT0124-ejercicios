// ---> Middlezare
const { deleteImgCloudinary } = require("../../middleware/file.middleware");

// ---> Modelo USER
const User = require("../models/User.model");
const Champion = require("../models/Champions.model");
const Region = require("../models/Regions.model");

// ---> Utils
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");

// ---> Librerias
const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
    setTestEmailSend,
    getTestEmailSend,
    } = require("../../state/state.data");
const { generateToken, verifyToken } = require("../../utils/token");
const dotenv = require("dotenv");
dotenv.config();
const randomPassword = require("../../utils/randomPassword");
const { enumGenderOk } = require("../../utils/enumOk");

// CRUD ---> CREATE, READ, UPDATE, DELETE


//! -----------------------------------------------------------------------------
//? -------------------------- REGISTER EN CODIGO -------------------------------
//! -----------------------------------------------------------------------------

const register = async (req, res, next) => {
    //Lo primero es capturar la imagen que hemos subido ya a cloudinary, siendo path la url de la imagen en cloudinary
    let catchImg = req.file?.path; 

    /**Por cada asincronica de actualización vamos a hacer un try/catch para poder individualizar los errores */
    try {
        //Empezamos sincronizando los index
        await User.syncIndexes();
        let confirmationCode = randomCode();
        const { email, name } = req.body // --> esta info la enviamos desde el body

        //Una vez que a través del body nos envian el mail y el nombre podemos buscar el usuario
        const userExist = await User.findOne(
            { email: req.body.email },
            { name: req.body.name }
        );

        //*Una vez hemos buscado el usuario pueden darse dos situaciones: 
        //* ---> Si el usuario NO EXISTE = LO REGISTRAMOS
        //* ---> Si el usuario EXISTE = ENVIAR ERROR --> "EL USUARIO YA EXISTE"
        if (!userExist) {
            const newUser = new User({...req.body, confirmationCode});
            //En este punto ya tenemos la ID del usuario, ya que acabamos de crearlo en moongose
            
            //El primer paso es verificar si el usuario ha metido una imagen:
            if (req.file) {
                newUser.image = req.file.path;
            } else {
                newUser.image = "https://res.cloudinary.com/dhzpdwhsd/image/upload/v1708980598/imagen_profil.jpg";
            }

            //Nueva asincronia para guardar o actualizar ---> otro try/catch
            try {
                const userSave = await newUser.save();

                if (userSave) { // ---> si el usuario se ha guardado le enviamos el mail de nodemeiler
                //Para enviar el mail hacemos uso del util sendMail que hemos creado

                sendEmail(email, name, confirmationCode);

                //Finalmente comprobamos si el codigo se ha enviado correctamente usando las funciones del state.date
                setTimeout(() => {
                    if (getTestEmailSend()) {
                      // Una vez usado el estado, es reinializar el estado del envio de mail a FALSE para la proxima comprobación
                        setTestEmailSend(false);
                        return res.status(200).json({
                        user: userSave,
                        confirmationCode,
                    });
                    } else {
                        setTestEmailSend(false);
                            return res.status(404).json({
                                user: userSave,
                                confirmationCode: "Ha habido un error, reenviar el codigo de confirmación",
                            });
                        }
                    }, 1100);
                }

            } catch (error) {
                return res.status(404).json(error.message);
            }

        }else{
            // ---> cuando ya existe un usuario con ese email y ese name
            if (req.file) deleteImgCloudinary(catchImg);
            // como ha habido un error la imagen previamente subida se borra de cloudinary
            // Lanzamos un error 409 ---> error de conflicto, ya que estan intentando crear un usuario que ya existe
            return res.status(409).json("Ese usuario ya existe, por favor intentelo de nuevo");
        }


    } catch (error) {
        // SIEMPRE QUE HAY UN ERROR GENERAL TENEMOS QUE BORRAR LA IMAGEN QUE HA SUBIDO EL MIDDLEWARE
        if (req.file) deleteImgCloudinary(catchImg);
        return next(error);
    }
};




//! -----------------------------------------------------------------------------
//? --------------------------- REENVIAR CODIGO ---------------------------------
//! -----------------------------------------------------------------------------
const resendCode = async (req, res, next) => {
    try {
        //Comenzamos crando un nuevo codigo y pidiendo la informacion del usuario
        let newConfirmationCode = randomCode();
        const { email, name } = req.body // --> esta info la enviamos desde el body

        //Comprobamos si el usuario existe en la data base
        const userExists = await User.findOne({ email:email });

        if (userExists){
            //Llamamos a la funcion creada en el util sendMail
            sendEmail(email, name, newConfirmationCode);

                //Finalmente comprobamos si el codigo se ha enviado correctamente usando las funciones del state.date
                setTimeout(async() => {
                    if (getTestEmailSend()) {
                      // Una vez usado el estado, es reinializar el estado del envio de mail a FALSE para la proxima comprobación
                        setTestEmailSend(false);

                        //Actualizamos el codigo de confirmacion del usuario en el data base
                        try {
                            await userExists.updateOne({confirmationCode:newConfirmationCode});
                        } catch (error) {
                            return res.status(404).json("😢 No se ha podido actualizar el codigo del usuario en la DB 😢");
                        };
                        
                        return res.status(200).json({
                            user: userExists,
                            newConfirmationCode,
                    });
                    } else {
                        setTestEmailSend(false);
                            return res.status(404).json({
                                user: userExists,
                                newConfirmationCode: "Ha habido un error, reenviar el codigo de confirmación",
                            });
                        }
                    }, 1500);
        }else{
            return res.status(404).json("😢 No se ha encontrado ese usuario 😢");
        }

    } catch (error) {
        return next(setError(500, error.message || "❌ Se ha producido un error en el catch general al reenviar el codigo ❌"));
    }
};




//! -----------------------------------------------------------------------------
//? ---------------------------- CHECK NEW USER ---------------------------------
//! -----------------------------------------------------------------------------
const checkNewUser = async (req, res, next) => {
    try {
        //Obtenemos el codigo de confirmacion y el mail por el req.body
        const { email, confirmationCode } = req.body;

        const userExists = await User.findOne({ email });

        if(!userExists){
            //En caso que el usuario no exista, devolvermos error ---> ERROR 404
            return res.status(404).json("El usuario no existe");

        }else{
            //Si el usuario existe, entonces tenemos que comprar que el codigo que nos da el usuario es el mismo que le hemos enviado
            if (confirmationCode === userExists.confirmationCode) {
                try { 
                    await userExists.updateOne({ check:true });

                    //Hacemos un testeo para confirmar que se ha guardado correctamente. Para ello buscamos el usuario y vemos si el check se ha actualizado
                    const updateUser = await User.findOne({ email });

                    return res.status(200).json({
                        testCheckOk: updateUser.check == true ? true : false,
                    });

                } catch (error) {
                    return res.status(404).json(error.message);
                }
            }else{
                try {
                    //El caso de que no coincida el codigo, borramos el usuario de la DB y lo reenviamos a la pagina de registro 
                    await User.findByIdAndDelete(userExists._id);
                    deleteImgCloudinary(userExists.image); //Borramos tambien la imagen con cloudinary

                    return res.status(200).json({
                        userExists,
                        check: false,
                        delete: (await User.findById(userExists._id))
                            ? "error delete user"
                            : "ok delete user",
                    });

                }catch (error) {
                    return res
                        .status(404)
                        .json(error.message || "No se ha podido relizar la eliminación del usuario");
                }
            }
        }

    } catch (error) {
        return next(setError(500, error.message || "❌ Error al checkear el usuario ---> CATCH ERROR ❌"));
    }
};




//! -----------------------------------------------------------------------------
//? --------------------------------LOGIN ---------------------------------------
//! -----------------------------------------------------------------------------

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });

        if (userDB) {
            //Si encuentra el usuario, simplemente comparamos que ambas contraseñas (la de la DB y la que pasa el usuario) sean iguale
            //! ---> Las contraseñas en DB estan encriptadas, por lo que usamos .compareSync para hacer la comparación
            if (bcrypt.compareSync(password, userDB.password)) {
                const token = generateToken(userDB._id, email); //
                return res.status(200).json({
                    user: userDB,
                    token,
                    });
            }else{
                return res.status(404).json("La contraseña es incorrecta, intentenlo de nuevo");
            }
        }else{
            return res.status(404).json("El usuario no está registrad 😒");
        }
    } catch (error) {
        return next(error);
    }
};




//! -----------------------------------------------------------------------------
//? --------------------------- AUTOLOGIN ---------------------------------------
//! -----------------------------------------------------------------------------

const autoLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });

        if (userDB) {
            // Comparamos las contraseñas 
            //! ---> En este caso ya habriamos iniciado sesion anteriormente y por tanto la contraseña ya esta encriptada, no necesitamos usar el bcrypt 
            if (password == userDB.password) {
                const token = generateToken(userDB._id, email);
                return res.status(200).json({
                    user: userDB,
                    token,
                });
            } else {
                return res.status(404).json("La contraseña es incorrecta, intentenlo de nuevo");
            }
        } else {
            return res.status(404).json("El usuario no está registrad 😒");
        }
    } catch (error) {
        return next(error);
    }
};




//? -----------------------------------------------------------------------------
//! ----------------- CAMBIO DE CONTRASEÑA CUANDO NO ESTAS LOGADO ---------------
//? -----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
    try {
        //Requerimos el email en el body y buscamos si el usuario con ese mail existe
        const { email } = req.body;

        const userDb = await User.findOne({ email });
        if (userDb) {
            /// Si existe hacemos un redirect --> pasamos a la funcion sendPassword
            const PORT = process.env.PORT;
            return res.redirect(
                307,
                `http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
            );
        } else {
            //Si no se encuentra un usuario con ese mail, enviamos un error 404
            return res.status(404).json("😢 El usuario con ese mail no esta registrad 😢");
        }
    } catch (error) {
        return next(error);
    }
};

const sendPassword = async (req, res, next) => {
    try {
        //VAMOS A BUSCAR AL USER POR EL ID DEL PARAM
        const { id } = req.params;
        const userDb = await User.findById(id);
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: password,
            },
        });

        //Generamos una contraseña con la funcion randomPassword() ---> utils/randomPassword.js
        let passwordSecure = randomPassword();
        console.log(passwordSecure);

        //Generamos el cuerpo del mail donde daremos al usuario la nueva contraseña
        const mailOptions = {
            from: email,
            to: userDb.email,
            subject: "-----",
            text: `Hola usuario: ${userDb.name}. Tu nueva contraseña es: ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
            };

        //Enviamos el mail usando nodemailer y comprobamos que el envio se ha efectuado correctamente
        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                //Si se ha producido un error enviamos un error 404
                console.log(error);
                return res.status(404).json("ERROR: No se ha enviado el mail de nueva contraseña ni se ha actualizado el usuario");
            } else {
                // Si no hay errores entonces guardamos la nueva contraseña del usuario en mongoDB
                console.log("Mail enviado: " + info.response);

                //Guardamos esta contraseña en mongo db ---> ANTES NECESITAMOS ENCRIPTARLA
                const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

                try {
                    await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

                    //!---> A PARTIR DE AQUI ES UN TEST DE ERRORES
                    //Primero volvemos a buscar el user, que ya deberia estar actualizado
                    const userUpdatePassword = await User.findById(id);

                    //Camparamos que la contraseña que hemos generado y la contraeña guardada en el user es la misma
                    //Recordar desencriptar al comparar con la contraseña guardada en mongoDB
                    if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
                        return res.status(200).json({
                            updateUser: true,
                            sendPassword: true,
                        });

                    } else {
                        return res.status(404).json({
                            updateUser: false,
                            sendPassword: true,
                        });
                    }
                } catch (error) {
                    return res.status(404).json(error.message);
                }
            }
        });

    } catch (error) {
        return next(error);
    }
};


//* ---> NUEVAS FUNCIONALIDADES : enviamos un mail al usuario para que el mismo proponga su nueva contraseña
const userCreatePassword = async (req, res, next) => {
    try{
        //Instanciamos el mail del usuario
        const { email } = req.body;
        const userDb = await User.findOne({ email });

        if (userDb){ //Si el usuario existe le envia un mail
            //Primero generamos el TOKEN para poder redirigir al usuaio de manera segura
            const userToken = generateToken(userDb.id, email);

            //Preparamos un mail para que el usuario acceda a una pagina donde pueda cambiar la contraseña mano
            const emailNode = process.env.EMAIL;
            const passwordNode = process.env.PASSWORD;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: emailNode,
                    pass: passwordNode,
                },
            });

            //Generariamos un mail con un link que redirigiria al usuario a una nueva funcion donde cambiar su contraseña manualmente
            const PORT = process.env.PORT;
            const mailOptions = {
                from: emailNode,
                to: email,
                subject: "-----",
                text: `Hola usuario: ${userDb.name}. Se ha solicitado un cambio de contraseña, por favor, haga click en el siguiente link para generar su contraseña:
                        http://localhost:${PORT}/api/v1/users/changePassword/${userToken}`,
                };

                transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        //Si se ha producido un error enviamos un error 404
                        console.log(error);
                        return res.status(404).json("ERROR: No se ha enviado el mail");
                    } else {
                        console.log("El mail se ha enviado correctamente" + info.response);
                        return res.status(200).json("Se ha enviado correctamente");
                    }
                });

        }else{
            return res
            .status(404)
            .json("No se ha podido enviar el mail");
        }
    }catch (error){
        return next(error);
    }
};


const userGeneratePassword = async (req, res, next) => {
    //Recogemos el token del param
    const { userToken } = req.params;

    //Decodificamos el token para poder extraer la ID y asi poder buscar al usuario y actualiza la nueva contraseña
    const decoded = verifyToken(userToken, process.env.JWT_SECRET);

    //Pedimos al usuario que el genere una nueva contraseña y que la confirme
    const { newPassword, newPasswordConfirmation }  = req.body;
    
    
    if (newPassword === newPasswordConfirmation) { 
        //Si el usuario ha escrito bien las contraseñas entonces actualizamos

        try {
            const newPasswordBcrypt = bcrypt.hashSync(newPassword, 10);
            
            await User.findByIdAndUpdate(decoded.id, { password: newPasswordBcrypt });

            //!---> A PARTIR DE AQUI ES UN TEST DE ERRORES
            //Primero volvemos a buscar el user, que ya deberia estar actualizado
            const userUpdatePassword = await User.findById(decoded.id);

            //Camparamos que la nueva contraseña  y la contraeña guardada en el userDB es la misma
            //Recordar desencriptar al comparar con la contraseña guardada en mongoDB
            if (bcrypt.compareSync(newPassword, userUpdatePassword.password)) {
                return res.status(200).json({
                    updateUser: true,
                });

            } else {
                return res.status(404).json({
                    updateUser: false,
                });
            }
        } catch (error) {
            return res.status(404).json(error.message);
        }

    }else{
        return res.status(404).json("😢 La contraseña no coincide, por favor, intentelo de nuevo 😢");
    }
};



//? -----------------------------------------------------------------------------
//! ------------ CAMBIO DE CONTRASEÑA CUANDO YA SE ESTA ESTA LOGADO -------------
//? -----------------------------------------------------------------------------

const modifyPassword = async (req, res, next) => {
    /** RECORDAR ---> REQ.USER LO CREAR LOS AUTH MIDDLEWARE */
    console.log("req.user", req.user);

    try {
        //Requerimos la contraseña y la nueva contraseña para hacer el cambio de la misma
        const { password, newPassword } = req.body;
        const { _id } = req.user;

        //Comparamos la contraseña que nos ha pasado el ususario con la contraseña almacenada en la DB antes de aceptar el cambio de contraseña
        if (bcrypt.compareSync(password, req.user.password)) {
            //Si las contraseñas coinciden entonces encriptamos la nueva contrseña y la guardamos en mongoDB
            const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

            try {
            await User.findByIdAndUpdate(_id, { password: newPasswordHashed }); // ---> aqui actualizamos la DB con la nueva contrseña ya encriptada
    
            //! --> TEST A TIEMPO REAL
    
            //*PASO 1: Traemos el user actualizado
            const userUpdate = await User.findById(_id);
    
            //*PASO 2: vamos a comparar la contraseña sin encriptar y la tenemos en el back que esta encriptada
            if (bcrypt.compareSync(newPassword, userUpdate.password)) {
                // SI SON IGUALES 200 ---> UPDATE OK
                return res.status(200).json({
                updateUser: true,
                });
            } else {
                //NO SON IGUALES -------> ERROR 404 
                return res.status(404).json({
                updateUser: false,
                });
            }
            } catch (error) {
            return res.status(404).json(error.message);
            }

        } else {
            //Si las contraseñas no son iguales mandamos un mensaje de error diciendo que no puede modificarse la contraseña
            return res.status(404).json("🤔 Las contraseñas no coinciden, no se puede cambiar la contraseña. Por favor, intentelo de nuev 🤔");
        }
    } catch (error) {
        return next(error);
    }
};




//! -----------------------------------------------------------------------------
//? ---------------------------------UPDATE--------------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
    //Capturamos la imagen que esta subida a cloudinary
    let catchImg = req.file?.path;

    try {
        // Sincronizamos indices
        await User.syncIndexes();

        // Instanciamos un nuevo objeto del modelo de user con el req.body
        const patchUser = new User(req.body);

        // En caso de tenes una imagen para actualizar, la pasamoa tambien
        req.file && (patchUser.image = catchImg);

        //A continuacion hacemos un guardado de la información que queremos "proteger"
        //! ---> Haciendo esto, el usuario no podrá cambiar los siguientes datos:
        patchUser._id = req.user._id;
        patchUser.password = req.user.password;
        patchUser.rol = req.user.rol;
        patchUser.confirmationCode = req.user.confirmationCode;
        patchUser.email = req.user.email;
        patchUser.check = req.user.check;


        if (req.body?.gender) {
            // Aqui simplemente comprobamos el genero, si no ha habido cambios o la función enumOK nos pasa un FALSE, se queda el dato que ya habia antes
            const resultEnum = enumGenderOk(req.body?.gender);
            patchUser.gender = resultEnum.check ? req.body?.gender : req.user.gender;
        };

        //! ---> HACEMOS LA ACTUALIZACION (NO HACER CON EL SAVE)
        /**Usamos el metodo .findByIdAndUpsate() y la pasamos dos valores:
         *   ---> el primer valor es la ID que tiene que buscar
         *   ---> el segundo es el valor que queremos que actualice
         */
        try {
            await User.findByIdAndUpdate(req.user._id, patchUser);

            //! ---> Ya actualizado hacemos un TEST
            const updateUser = await User.findById(req.user._id);
            const updateKeys = Object.keys(req.body);
            const testUpdate = [];

            updateKeys.forEach((item) => {
                //Comprobamos que el user actualizado contiene la misma info que lo que hemos pasado por el body
                if (updateUser[item] === req.body[item]){
                    //Si la info coincide, entonces comprobamos tambien que la info sea diferente a lo que habia en mongoBD
                    if (updateUser[item] != req.user[item]) {
                        testUpdate.push({
                            [item]: true, // ---> PUSHEAMOS UN TRUE A LA LISTA DE TESTEO
                            });
                    } else {
                        testUpdate.push({
                            [item]: "sameOldInfo", // ---> INDICAMOS EN LA LISTA DE TESTEO QUE ES LA MISMA INFO QUE ANTES
                            });
                    }
                } else {
                    testUpdate.push({
                        [item]: false, // ---> FALSE A LA LISTA DE TESTEO = la info del body no coincide con la actulziacion
                        });
                }
            });

            //! ---> PARA LA IMAGEN
            if (req.file){
                /**Si la imagen del usuario actualizado es === a al catchImg que es donde hemos capturado la nueva
                 * imagen al principio, entonces pasamos true al testeo
                */
                updateUser.image === catchImg
                ? testUpdate.push({
                    image: true,
                    })
                : testUpdate.push({
                    image: false,
                    });
            };

            //! ---> HASTA AQUI EL TESTEO
            //Devolvemos el resultado del test y el usuario actualizado
            return res.status(200).json({
                updateUser,
                testUpdate,
                });
        } catch (error) {
            if (req.file) deleteImgCloudinary(catchImg);
            return res.status(404).json(error.message);
        }

    } catch (error) {
        if (req.file) deleteImgCloudinary(catchImg);
            return next(error);
    }
};




//! -----------------------------------------------------------------------------
//? ---------------------------------DELETE--------------------------------------
//! -----------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
    try {
        //Requerimos la ID del usuario que queremos borrar y la imagen
        const { _id, image } = req.user;

        //Hacemos un findByIdAndDelete para borrar al usuario
        await User.findByIdAndDelete(_id);

        //Y hacemos una prueba de que el usuario se ha borrado correctamente
        if (await User.findById(_id)) {
            return res.status(404).json("No se ha podido borrar el usuario"); 
        } else {
            deleteImgCloudinary(image);
            return res.status(200).json("El usuario se ha borrado correctamente");
        }
    } catch (error) {
        return next(error);
    }
};




//! -----------------------------------------------------------------------------
//? ------------------------------ FOLLOW USER ----------------------------------
//! -----------------------------------------------------------------------------

const followUserToggle = async (req, res, next) => {
    try {
        const { idUserSeQuiereSeguir } = req.params; //Almacenamos el ID del usuario que quiero seguir
        const { followed } = req.user; //Lista de seguidos
        const userSeguido = User.findById(idUserSeQuiereSeguir);

        if (followed.includes(idUserSeQuiereSeguir)) {
            //Si lo incluye quiere decir que ya los sigo, asique lo dejamos de seguir
            try {
                //Para dejar de seguirlo, borro su ID del array de usuarios seguidos
                await User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        followed: idUserSeQuiereSeguir,
                        },
                });

                try {
                    //Ademas tengo que borrarme de la lista de seguidores del usuario que he dejado de seguir
                    await User.findByIdAndUpdate(idUserSeQuiereSeguir, {
                        $pull: {
                            followers: req.user._id,
                        }
                    });

                    return res.status(200).json({
                        action: `He dejado de seguir al usuario ${userSeguido.name}`,
                        authUser: await User.findById(req.user._id),
                        userSeQuiereSeguir: userSeguido,
                        });

                } catch (error) {
                    return res.status(404).json({
                        error:
                            "❌ CATCH ERROR: no se ha podido actualizar la lista de seguidores del usuario que queremos dejar de seguir ❌",
                        message: error.message,
                        });
                }

            } catch (error) {
                return res.status(404).json({
                    error:
                        "❌ CATCH ERROR: No se ha podido borrar al usuario de mi lista de seguidos",
                    message: error.message,
                    });
            }

        }else{ //Si el usuario no esta en mi lista de seguidos, entonces empezamos a seguirlo
            try {
                //Lo pusheamos en nuestra lista de followed
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                    followed: idUserSeQuiereSeguir,
                    },
                });

                try {
                //Y nos añadimos a la lista de seguidores del usuario al que acabamos de seguir
                await User.findByIdAndUpdate(idUserSeQuiereSeguir, {
                    $push: {
                    followers: req.user._id,
                    },
                });

                return res.status(200).json({
                    action: "Se ha podido seguir al usuario correctamente",
                    authUser: await User.findById(req.user._id),
                    userSeQuiereSeguir: await User.findById(idUserSeQuiereSeguir),
                });
                } catch (error) {
                return res.status(404).json({
                    error:
                    "error catch update quien le sigue al user que recibo por el param",
                    message: error.message,
                });
            }
        } catch (error) {
            return res.status(404).json({
            error:
                "❌ CATCH ERROR ❌",
            message: error.message,
            });
        }
    }
    

    } catch (error) {
        return res.status(404).json({
            error: "❌ CATCH ERROR: catch general de la funcion FOLLOWUSER ❌",
            message: error.message,
        });
    }
};




//! -----------------------------------------------------------------------------
//? ----------------------- FAVS CHAMPIONS / REGIONS ----------------------------
//! -----------------------------------------------------------------------------

const favChampionsToggle = async (req, res, next) => {
    
    try{

        //Primero requerimos que el usuario nos pase el nombre del campeon que quiere añadir o quitar de su lista de favs
        const { name } = req.body; 
        //Y nos traemos la lista de favoritos actual del usuario

        const { championsFav } = req.user;

        //Almacenamos el campeon que nos ha pasado el usuario en una variable
        const champion = await Champion.findOne({ name: name });
        const championId = champion._id;
        console.log(championId);


        if (championsFav.includes(championId)) {
            //Si lo incluye quiere decir que ya esta agregado a favoritos asique lo eliminamos
            try {
                //Borro la ID del champion del array de favoritos del usuario
                await User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        championsFav: championId,
                        },
                });

            } catch (error) {
                return res.status(404).json({
                    error:
                        "❌ CATCH ERROR: No se ha podido borrar el campeon de favoritos",
                    message: error.message,
                    });
            }

            return res.status(200).json({
                message: "LISTA DE FAVORITOS ACTUALIZADA",
                });

        }else{
            //Si no lo incluye quiere decir que aun no esta agregado a favoritos asique lo añadimos
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        championsFav: championId,
                        },
                });

            } catch (error) {
                return res.status(404).json({
                    error:
                        "❌ CATCH ERROR: No se ha podido añadir el campeon de favoritos",
                    message: error.message,
                    });
            }
            return res.status(200).json({
                message: "LISTA DE FAVORITOS ACTUALIZADA"
                });
        }

    }catch(error){
        return res.status(404).json({
            error: "❌ CATCH ERROR: catch general de la funcion CHAMPION FAV ❌",
            message: error.message,
        });
    }
}

const favRegionsToggle = async (req, res, next) => {
    
    try{

        //Primero requerimos que el usuario nos pase el nombre del campeon que quiere añadir o quitar de su lista de favs
        const { name } = req.body; 
        //Y nos traemos la lista de favoritos actual del usuario

        const { regionsFav } = req.user;

        //Almacenamos el campeon que nos ha pasado el usuario en una variable
        const region = await Region.findOne({ name: name });
        const regionId = region._id;


        if (regionsFav.includes(regionId)) {
            //Si lo incluye quiere decir que ya esta agregado a favoritos asique lo eliminamos
            try {
                //Borro la ID del champion del array de favoritos del usuario
                await User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        regionsFav: regionId,
                        },
                });

            } catch (error) {
                return res.status(404).json({
                    error:
                        "❌ CATCH ERROR: No se ha podido borrar la region de favoritos",
                    message: error.message,
                    });
            }

            return res.status(200).json({
                message: "LISTA DE FAVORITOS ACTUALIZADA",
                });

        }else{
            //Si no lo incluye quiere decir que aun no esta agregado a favoritos asique lo añadimos
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        regionsFav: regionId,
                        },
                });

            } catch (error) {
                return res.status(404).json({
                    error:
                        "❌ CATCH ERROR: No se ha podido añadir la region a favoritos",
                    message: error.message,
                    });
            }
            return res.status(200).json({
                message: "LISTA DE FAVORITOS ACTUALIZADA"
                });
        }

    }catch(error){
        return res.status(404).json({
            error: "❌ CATCH ERROR: catch general de la funcion REGION FAV ❌",
            message: error.message,
        });
    }
}

module.exports = {
    register,
    resendCode,
    checkNewUser,
    login,
    autoLogin,
    changePassword,
    sendPassword,
    modifyPassword,
    update,
    deleteUser,
    followUserToggle,
    userCreatePassword,
    userGeneratePassword,
    favChampionsToggle,
    favRegionsToggle
};