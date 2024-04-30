import Swal from "sweetalert2/dist/sweetalert2.all.js";


export const useCheckCodeError = (
    res,
    setRes,
    setOkCheck,
    setOkDeleteUser,
    userlogin,
    setUserNotFound ) => {


    //--> ERROR 500 : Error interno en el server
    if (res?.response?.status == 500) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Interval Server Error ❎!",
        showConfirmButton: false,
        timer: 1500,
        });

        setRes(() => ({}));
    }


    //--> 200 test = true
    if (res?.data?.testCheckOk?.toString() == "true") {
        //Si viene del login modificamos el estado de user del contexto para poner el check en true
        if (localStorage.getItem("user")) {
        const currentUser = localStorage.getItem("user");
        const parseUser = JSON.parse(currentUser);
        const customUser = {
            ...parseUser,
            check: true,
        };

        const stringUser = JSON.stringify(customUser);
        // llamamos a la funcion de login para resetear que el check esta a true
        userlogin(stringUser);
        }
        setOkCheck(() => true);
        setRes(() => ({}));
        Swal.fire({
        icon: "success",
        title: "Código correcto ✅",
        showConfirmButton: false,
        timer: 1500,
        });
    };


      //--> 200 test = false
    if (res?.data?.testCheckOk?.toString() == "false") {
        // el codigo si era correcto pero el actualizar en el back el check no se ha producido correctamente
        setRes(() => ({}));
        Swal.fire({
        icon: "error",
        title: "Error interno del servidor ❎.",
        text: "Por favor, intentelo de nuevo.",
        showConfirmButton: false,
        timer: 2500,
        });
    };

    //--> 200: delete = 'ok delete user'
    if (res?.data?.delete?.includes("ok delete user")) {
        // esto le enviamos al register porque le henmos borrrado el usuario
        setOkDeleteUser(() => true);
        setRes(() => ({}));
        Swal.fire({
        icon: "error",
        title: "El código no es correcto ❎.",
        text: "Se ha borrado el usuario. Por favor, regístrese de nuevo.",
        showConfirmButton: false,
        timer: 2500,
        });
    };

    //--> 200: delete = 'error delete user'
    if (res?.data?.delete?.includes("error delete user")) {
        setRes(() => ({}));
        Swal.fire({
        icon: "error",
        title: "El código no es correcto ❎.",
        text: "No se ha podido borrar el usuario. Por favor, intentelo de nuevo.",
        showConfirmButton: false,
        timer: 2500,
        });
    }

    //--> userNoFound ---> 404
    // El usuario ha recargado la página y no encuentra el user --> tiene que ir al login
    console.log("este es el error que me lanza", res);
    if (res?.response?.status == 404) {
        setUserNotFound(() => true);
        setRes(() => ({}));
        Swal.fire({
        icon: "error",
        title: "Error interno del servidor ❎.",
        text: "Necesitas iniciar sesión para poder veridicar el código 🥺",
        showConfirmButton: false,
        timer: 1500,
        });
    };
};

