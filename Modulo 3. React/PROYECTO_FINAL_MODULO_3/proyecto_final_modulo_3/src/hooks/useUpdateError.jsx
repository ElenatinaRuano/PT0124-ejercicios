import Swal from "sweetalert2";
import { updateToken } from "../utils/updateToken";


export const useUpdateError = (res, setRes, userLogin, setUserUpdate) => {

    //--> STATUS 200 : TODO OKEY
    let contador;

    if (res?.data) {
        contador = 0;
        res?.data?.testUpdate?.map((item) => {
        for (let clave in item) {
            if (item[clave] == false) {
            contador++;
            }
        }
        });
    }

    if (contador == 0) {
        let check = "";

        res?.data?.testUpdate?.forEach((item) => {
        for (let clave in item) {
            if (item[clave] == true) {
            check += `-${clave}-`;
            }
        }
        });
        if (res?.status == 200) {
            const updatedToken = updateToken();

            const dataCustom = {
                user: res.data.updateUser.name,
                email: res.data.updateUser.email,
                image: res.data.updateUser.image,
                check: res.data.updateUser.check,
                gender: res.data.updateUser.gender,
                _id: res.data.updateUser._id,
                token: updatedToken,
            };
            
            const stringUser = JSON.stringify(dataCustom);
            userLogin(stringUser);
            setUserUpdate(() => true);
            setRes(() => ({}));
            return Swal.fire({
                icon: "success",
                title: `El usuario se ha actualizado con exito✅`,
                text: ` Update: ${check} `,
                showConfirmButton: true,
            });
        }
    };


    //--> ERROR 500 : ERROR DEL SERVIDOR
    if (res?.response?.status == 500 || res?.response?.status == 404) {
        setRes(() => ({}));
        return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Se ha producido un error en el servidor. No se ha podido actualizar el usuario❎ ",
        showConfirmButton: false,
        timer: 1500,
        });
    }


    //--> ERROR 404 : ERROR GENERAL
    if (contador != 0) {
        if (res?.status == 200) {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: `Error al actualizar el usuario. Intentelo de nuevo ❌`,
            showConfirmButton: false,
            timer: 1500,
        });
        }
    }
};