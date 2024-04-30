import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { changePasswordUserToken } from "../services/user.service";
import { useChangePasswordError } from "../hooks";
import { Navigate } from "react-router-dom";


export const ChangePassword = () => {
    //ESTADOS
    const { setUser } = useAuth();
    const { handleSubmit, register } = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [changeOk, setChangeOk] = useState(false);


    //!-----------------------------------------------------------------------------------------------------------


    // 1--> DECLARAMOS LA FUNCION QUE GESTIONA EL FORMULARIO
    const formSubmit = (formData) => {
        const { password, newPassword, confirmPassword} = formData;

        if (newPassword == confirmPassword) {
            Swal.fire({
                title: "¿Estás seguro de que quieres cambiar tu contraseña?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "rgb(73, 193, 162)",
                cancelButtonColor: "#d33",
                confirmButtonText: "SI",
                cancelButtonText: "NO"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setSend(true);
                    setRes(await changePasswordUserToken({ password, newPassword }));
                    setSend(false);
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: " La nueva contraseña no coincide con la contraseña de confirmación❎.",
                showConfirmButton: false,
                timer: 2500,
            });
        };
    };


    //!-----------------------------------------------------------------------------------------------------------


    // 2--> UTILIZAMOS USEEFFECT PARA LA GESTIÓN DE ERRORES
    useEffect(() => {
        console.log("Estamos gestionando los errores del changePassword", res);
        useChangePasswordError(res, setRes,setChangeOk);
    }, [res]);


    //!-----------------------------------------------------------------------------------------------------------


    // 3--> DIBUJAMOS EL CHANGEPASSWORD
    if(changeOk){
        return <Navigate to='/profile'></Navigate>
    };


    return (
        <>
            <div className="form-wrap form-wrap-color">
                <h1>♻ Cambiar contraseña ♻</h1>
                <p>Por favor, escriba aquí su antigua contraseña</p>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="password_container form-group">
                        <input
                        className="input_user"
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="false"
                        {...register("password", { required: true })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                        antigua contraseña
                        </label>
                    </div>
                    <div className="newPassword_container form-group">
                        <input
                        className="input_user"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        autoComplete="false"
                        {...register("newPassword", { required: true })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                        nueva contraseña
                        </label>
                    </div>
                    <div className="confirmPassword_container form-group">
                        <input
                        className="input_user"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="false"
                        {...register("confirmPassword", { required: true })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                        confirme la nueva contraseña
                        </label>
                    </div>
                    <div className="btn_container">
                        <button
                        className="btn"
                        type="submit"
                        disabled={send}
                        style={{ background: send ? "#fac07e" : "#fc8906" }}
                        >
                        CAMBIAR CONTRASEÑA
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};