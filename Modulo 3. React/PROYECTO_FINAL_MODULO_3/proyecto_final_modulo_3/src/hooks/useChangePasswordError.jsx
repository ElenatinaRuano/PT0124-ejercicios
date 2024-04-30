import Swal from "sweetalert2";

export const useChangePasswordError = (res, setRes, setChangeOk) => {

    //--> STATUS 200 : UPDATEUSER = TRUE
    if (res?.data?.updateUser?.toString() == "true") {
        setRes(() => ({}));
        setChangeOk(() => true);
        return Swal.fire({
            icon: "success",
            title: "La contraseña se ha cambiado con éxito ✅",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    //--> STATUS 200 : UPDATEUSER = FALSE
    if (res?.data?.updateUser?.toString() == "false") {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Problema en el servidor ❎.",
            text: "Por favor, intentelo de nuevo",
            showConfirmButton: false,
            timer: 2500,
        });
    };


    //--> STATUS 400 : GENERAL
    if (res?.response?.status == 404) {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Se ha producido un error ❎.",
            text: "Por favor, intentelo de nuevo",
            showConfirmButton: false,
            timer: 3000,
        });
    };


    //--> STATUS 500 : ERROR EN EL SERVIDOR
    if (res?.response?.status == 500) {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Se ha producido un eror interno en el servidor ❎!",
            showConfirmButton: false,
            timer: 1500,
        });
    }; 
};