const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/file.middleware");
const { register, 
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
        favRegionsToggle} = require("../controllers/User.controllers");
const express = require("express");

// ---> Creamos las rutas
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.patch("/resend", resendCode);
UserRoutes.patch("/check", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.patch("/forgotpassword", changePassword);
UserRoutes.patch("/sendPassword/:id", sendPassword); //---> ESTA RUTA PUEDE SER REDIRECT
UserRoutes.patch("/changepassword", [isAuth], modifyPassword); // --> NECESITA AUTENTIFICACION
UserRoutes.patch("/update", [isAuth], upload.single("image"), update); // --> NECESITA AUTENTIFICACION
UserRoutes.delete("/", [isAuth], deleteUser); // --> NECESITA AUTENTIFICACION
UserRoutes.patch("/follow/:idUserSeQuiereSeguir", [isAuth], followUserToggle);

//! ---> NUEVAS FUNCIONALIDADES
UserRoutes.post("/changepassword/userCreate", userCreatePassword); // --> Envia un mail al usuario para hacer el cambio de contraseña manual
UserRoutes.patch("/changepassword/:userToken", userGeneratePassword); // --> El mail pasa la contraseña y la guardamos en la base de datos
UserRoutes.patch("/championFav", [isAuth], favChampionsToggle); // --> Añade o elimina un campeon de la lista de favoritos
UserRoutes.patch("/regionFav", [isAuth], favRegionsToggle); // --> Añade o elimina una region de la lista de favoritos


//Exportamos la función
module.exports = UserRoutes;
