import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useForgotPasswordError = (res, setRes, setForgotOk) => {

    //--> ERROR 404 : 'USUARIO NO REGISTRADO'
    if (
        res?.response?.status == 404 &&
        res?.response?.data?.includes("El usuario con ese mail no esta registrado")
    ) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No existe un usuario con ese correo, por favor intentelo de nuevo ❎",
            showConfirmButton: false,
            timer: 3000,
        });
    };


    //--> ERROR 404 : 'NO SE HA PODIDO REENVIAR EL CORREO, NO SE HA ACTUALIZADO LA CONTRASEÑA'
    if (
        res?.response?.status == 404 &&
        res?.response?.data?.includes("ERROR: No se ha enviado el mail de nueva contraseña ni se ha actualizado el usuario")
    ) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido reenviar el mail. ❎ El usuario no se ha actualizado, intentelo de nuevo",
            showConfirmButton: false,
            timer: 3000,
        });
    };


    //--> STATUS 200: TODO CORRECTO
    if (res?.status == 200) {
        if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
            setForgotOk(() => true);
            setRes(() => ({}));
            Swal.fire({
                icon: "success",
                title: "Contraseña actualizada con exito",
                text: "Le hemos enviado un mail con su nueva contraseña ✅",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };


    //--> STATUS 400: CONTRASEÑA ENVIADA PERO USUARIO NO ACTUALIZADO
    if (
        res?.response?.status == 404 &&
        res?.response?.data?.sendPassword == true &&
        res?.response?.data?.updateUser == false
    ) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Error en la actualizacion del usuario",
            text: "El mail que ha recibido con la nueva contraseña no es valido. Por favor, intentelo de nuevo ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    //--> STATUS 500: ERROR DEL SERVIDOR
    if (res?.response?.status == 500) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Internal server error ❎, please try again ",
            showConfirmButton: false,
            timer: 1500,
        });
    };

};