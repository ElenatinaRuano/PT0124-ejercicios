import Swal from "sweetalert2";
import { deleteUserService } from "../services/user.service";

export const useDeleteUser = (setUser, setDeleteUser) => {
    Swal.fire({
        title: "¿Estas seguro de que quieres borrar tu perfil de nuestra página?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        cancelButtonText: "NO",
        confirmButtonText: "SI",
    }).then(async (result) => {
        console.log("result", result);
    
        if (result.isConfirmed) {
            const res = await deleteUserService();
        
            switch (res.status) {
                case 200:
                Swal.fire({
                    icon: "success",
                    title: "El usuario se ha borrado correctmente",
                    text: "¡Esperamos volver a verte pronto!",
                    showConfirmButton: false,
                    timer: 1500,
                });
        
                setUser(() => null);
                setDeleteUser(() => true);
                localStorage.removeItem("user");
                console.log(localStorage);
        
                break;
        
                default:
                Swal.fire({
                    icon: "error",
                    title: "No se ha podido borrar el usuario ❎",
                    text: "Por favor, intentelo de nuevo",
                    showConfirmButton: false,
                    timer: 1500,
                });
        
                break;
            }
            }
        });
};