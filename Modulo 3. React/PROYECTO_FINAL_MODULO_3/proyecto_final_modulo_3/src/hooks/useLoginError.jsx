import Swal from 'sweetalert2'

export const useLoginError = (res, setRes, userLogin, setLoginOk) => {
    //El parametro userLogin hace referencia a la funcion LOGIN
    //Cuando en la pagina Login llamamos a userEffects --> llama a este custom hook para gestionar los errores

    //--> TODO HA SALIDO BIEN: STATUS 200
    if (res?.status == 200) {
        const dataCustom = {
            token: res.data.token,
            user: res.data.user.name,
            email: res.data.user.email,
            image: res.data.user.image,
            check: res.data.user.check,
            gender: res.data.user.gender,
            _id: res.data.user._id,
        };

        const stringUser = JSON.stringify(dataCustom);
        userLogin(stringUser);
        setLoginOk(() => true); // --> hacemos uso de una callback para llamar al estado setUserOk declarado en el login
        
        Swal.fire({
            icon: "success",
            title: "❤ Bienvenido a mi pagina web ❤",
            text: "El login se llevó a cabo correctamente",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    //--> ERROR 409: USUARIO NO REGISTRADO
    if (res?.response?.data?.includes("El usuario no está registrad")) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no está registrado, por favor, intentelo de nuevo ❎",
            showConfirmButton: false,
            timer: 2000,
        });
    };


    //--> ERROR 404: LA CONTRASEÑA NO ES CORRECTA
    if (res?.response?.data?.includes("La contraseña es incorrecta, intentenlo de nuevo")) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La contraseña no es correcta, por favor, intentelo de nuevo ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    //--> ERROR 500: PROBLEMAS DEL SERVIDOR
    if (res?.response?.status == 500) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Lo sentimos, estamos teniendo problemas con el servidor, intentelo de nuevo más tarde ❎!",
            showConfirmButton: false,
            timer: 1500,
        });
    };
};


export default useLoginError;