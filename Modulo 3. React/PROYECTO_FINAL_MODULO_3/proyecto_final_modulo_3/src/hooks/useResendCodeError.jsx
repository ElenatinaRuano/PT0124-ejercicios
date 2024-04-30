import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useResendCodeError = ( resResend, setResResend, setUserNotFound) => {

    //--> resend == false : STATUS 404
    if (resResend?.data?.resend.toString() == "false") {
        setResResend(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Se ha producido un error al enviar el código 🔴. Por favor, intentelo de nuevo",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    //--> resend == true : STATUS 200
    if (resResend?.data?.resend.toString() == "true") {
        setResResend(() => ({}));
        Swal.fire({
            icon: "success",
            title: "Se ha enviado el codigo con éxisto ✅. ¡Verifica tu email!",
            showConfirmButton: false,
            timer: 3000,
        });
    };


    //--> USER NO ENCONTRADO : ERROR 404
    if (
        resResend?.response?.status == 404 &&
        resResend?.response?.data.includes("User not found")
        ) {
        setUserNotFound(() => true);
        setResResend(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Error interno en el servidor .",
            text: "No se ha podido encontrar el usuario ❎. Intenta iniciar sesión de nuevo",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    //--> ERROR DEL SERVIDOR : ERROR 500
    if (resResend?.response?.status == 500) {
        setResResend(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Error interno en el servidor! No se ha podido enviar el mail de confirmación❎",
            showConfirmButton: false,
            timer: 1500,
        });
    };
};

export default useResendCodeError;

