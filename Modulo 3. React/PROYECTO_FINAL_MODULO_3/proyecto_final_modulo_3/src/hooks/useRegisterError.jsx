import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useRegisterError = (res, setRegisterOk, setRes) => {
    /**Los estados, segun si dan error o no se almacenan en un sitio o en otro. Hemos de tener esto en cuenta a la hora de llamar a los estados:
     *  --> si la respuesta es ok --> directamente esta el status en la primera clave es decir: res.status
     *  --> si la respuesta no esta ok --> res.response.status
     */

    console.log("res del use", res);

    //--> TODO HA SALIDO BIEN: STATUS 200
    if(res?.status == 200) {
        console.log("🎉 Este es el IF STATUS 200 🎉");
        const dataToString = JSON.stringify(res);
        localStorage.setItem("data", dataToString);
        setRegisterOk(() => true);

        Swal.fire({ // --> Esto es la extension SWAL para ventanas emergentes con mensajes de alerta
            icon: "success",
            title: "Bienvenido a mi pagina 💌",
            showConfirmButton: false,
            timer: 1500,
        });

        setRes({}); //--> Reseteamos el valor de RES siempre al final, le damos el valor de un objeto vacio para su siguiente uso
    };


    //--> ERROR 409: EL USUARIO YA ESTA REGISTRADO
    if (res?.resonse?.status === 409) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario ya existe, por favor, intentelo de nuevo con otro correo 😢",
            showConfirmButton: false,
            timer: 1500,
            });
            setRes({});
    };


    //--> LA CONTRASEÑA NO TIENE EL FORMATO CORRECTO
    if(res?.response?.data?.includes("validation failed: password")) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revise la contraseña: minimo 8 caracteres, 1 letra mayuscula, 1 letra minuscula y un caracter especial",
        showConfirmButton: false,
        timer: 3500,
        });
        setRes({});
    };


    //--> EL USERNAME YA EXISTE
    if (
        res?.response?.data?.includes("this user already exist")
    ) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ese nombre de usuario ya existe, por favor, intentelo de nuevo",
        showConfirmButton: false,
        timer: 2000,
        });
        setRes({});
    };


    //--> ERROR 500: ERROR INTERNO DEL SERVIDOR
    if (res?.response?.status == 500) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Ha habido un problema con el servidor!❎ Por favor, intentelo de nuevo.",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    };


    //--> ERROR 404: ERROR, REENVIAR CODIGO
    if (
        res?.response?.status == 404 &&
        res?.response?.data?.confirmationCode?.includes("error, resend code")
    ) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El registro se ha realizado correctamente pero ha habido un error, reenviar el codigo ❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    };
};

export default useRegisterError;