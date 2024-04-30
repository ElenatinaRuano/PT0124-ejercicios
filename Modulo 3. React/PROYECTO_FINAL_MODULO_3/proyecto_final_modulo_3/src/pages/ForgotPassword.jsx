import "./ForgotPassword.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../services/user.service";
import { useForgotPasswordError } from "../hooks";


export const ForgotPassword = () => {
    //ESTADOS
    const { handleSubmit, register } = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [forgotOk, setForgotOk] = useState(false);


    //!---------------------------------------------------------------------------------------------------


    // 1 -->  CREAMOS LAS FUNCION PARA LA DATA DEL FORMULARIO 
    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await forgotPasswordUser(formData));
        setSend(false);
    };


    //!---------------------------------------------------------------------------------------------------


    // 2 -->  USAMOS USEEFFECT PARA GESTIONAR ERRORES
    useEffect(() => {
        console.log("Esto es la respuesta de ForgotPasszword", res);
        useForgotPasswordError(res, setRes, setForgotOk);
    }, [res]);


    //!---------------------------------------------------------------------------------------------------


    // 3 -->  PINTAMOS LOS ESTADOS DE NAVEGACION
    if(forgotOk){
        return <Navigate to='/login'/>
    }

    return (
    <>
        <div className="form-wrap form-wrap-color">
            <h1>🔑 Cambio de contraseña 🔑</h1>

            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="user_container form-group">
                    <input
                    className="input_user"
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="false"
                    {...register("email", { required: true })}
                    />
                    <label htmlFor="custom-input" className="custom-placeholder">
                    Email
                    </label>
                </div>

                <div className="btn_container">
                    <button
                    className="btn"
                    type="submit"
                    disabled={send}
                    style={{ background: send ? "#fac07e" : "#fc8906" }}
                    >
                    Cambiar contraseña
                    </button>
                </div>

                <p className="bottom-text">
                    <small>Por favor, escribe aqui tu mail para que podamos enviarte la nueva contraseña </small>
                </p>
            </form>
        </div>
    </>
    );
};



