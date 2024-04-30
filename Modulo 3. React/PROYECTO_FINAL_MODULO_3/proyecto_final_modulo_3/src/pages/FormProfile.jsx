import { useForm } from "react-hook-form";
import "./FormProfile.css";
import { FigureUser, Uploadfile } from "../components";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateUser } from "../services/user.service";
import { useUpdateError } from "../hooks";
import { Navigate } from "react-router-dom";

export const FormProfile = () => {
    //ESTADOS
    const { user, setUser, login } = useAuth();
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [userUpdate, setUserUpdate] = useState(false);

    const defaultData = {
        name: user?.user,
    };


    //!--------------------------------------------------------------------------------------------------

    
    // 1 --> FUNCION PARA GESTIONAR EL FORMULARIO
    const formSubmit = (formData) => {
        Swal.fire({
            title: "¿Estas seguro de que quieres actualizar tu perfil?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(73, 193, 162)",
            cancelButtonColor: "#d33",
            cancelButtonText: "NO",
            confirmButtonText: "SI",
            }).then(async (result) => {
            if (result.isConfirmed) {
                const inputFile = document.getElementById("file-upload").files;
        
                if (inputFile.length != 0) {
                    const customFormData = {
                        ...formData,
                        image: inputFile[0],
                    };

                    setSend(true);
                    setRes(await updateUser(customFormData));
                    setSend(false);

                } else {
                    const customFormData = {
                        ...formData,
                    };

                    setSend(true);
                    setRes(await updateUser(customFormData));
                    setSend(false);
                }
            }
        });
    };


    //!--------------------------------------------------------------------------------------------------

    
    // 2 --> USAMOS USEEFFECT PARA LA GESTION DE ERRORES
    useEffect(() => {
        console.log(res);
        useUpdateError(res, setRes, login, setUserUpdate);
    }, [res]);


    //!--------------------------------------------------------------------------------------------------

    
    // 3 --> DIBUJAMOS EL FORMULARIO
    if (userUpdate){
        return (
        <Navigate to='/profile'/>)

    }

    return (
        <>
        <div className="formProfilDiv">
            <div className="containerDataNoChange">
                <div className="containerProfile">
                        <FigureUser user={user} />
                </div>
            </div>

            <div className="containerProfile">
                <div className="form-wrap formProfile">

                    <h1>♻ Actualiza tu perfil ♻</h1>

                    <p>Aqui podrás actualizar la información de tu perfil</p>

                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="user_container form-group">
                            <input
                                className="input_user"
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="false"

                                // A PARTIR DE AQUI ES LO NUEVO ------>
                                defaultValue={defaultData?.name}
                                {...register("name", { required: true })}
                            />
                            <label htmlFor="custom-input" className="custom-placeholder">
                                nombre de usuario
                            </label>
                        </div>

                        <Uploadfile />

                        <div className="btn_container">
                            <button
                                className="btn"
                                type="submit"
                                disabled={send}
                                style={{ background: send ? "#fac07e" : "#fc8906" }}
                            >
                                ACTUALIZAR MI PERFIL
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
};