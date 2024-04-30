import "./CheckCode.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import {
    checkCodeConfirmationUser, 
    resendCodeConfirmationUser,} from "../services/user.service";
import { useAuth } from "../context/authContext";
import { 
    useAutoLogin, 
    useCheckCodeError, 
    useResendCodeError } from "../hooks";


export const CheckCode = () => {
    //ESTADOS
    const navigate = useNavigate();
    const { allUser, login, setUser } = useAuth();
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({}); // --> Necesitamos la RES para el check de la confirmacion del codigo
    const [resResend, setResResend] = useState({}); // --> Para gestionar el envio del codigo de confirmacion
    const [send, setSend] = useState(false);
    const [okCheck, setOkCheck] = useState(false);

    //ESTADOS PARA CUANDO SE RECARGA LA PAGINA DE CONFIRMACION
    const [okDeleteUser, setOkDeleteUser] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);


    //!---------------------------------------------------------------------------------------------------


    // 1 -->  CREAMOS LAS FUNCION PARA LA DATA DEL FORMULARIO Y EL REENVIO
    const formSubmit = async (formData) => {
        /**Lo primero va a ser averiguar de donde viene el usuario
         * Para ello comprobamos la informacion almacenada en el localStorage
         *    ---> Si hay algo en el localStorage viene del login
         *    ---> Si no hay nada viene del register ---> cogemos la info de allUser
         */
        const userLocal = localStorage.getItem('user');

        if (userLocal == null){ // --> Viene del register --> ALLUSER
            const custFormData = {
                confirmationCode : parseInt(formData.confirmationCode),
                email : allUser.data.user.email,
            };

            setSend(true);
            setRes(await checkCodeConfirmationUser(custFormData))
            setSend(false);

        }else{ // --> Viene del Login --> LOCALSTORAGE
            const parseUser = JSON.parse(userLocal);
            const custFormData = {
                confirmationCode: parseInt(formData.confirmationCode),
                email: parseUser.email,
            };
            setSend(true);
            setRes(await checkCodeConfirmationUser(custFormData))
            setSend(false);
        };
    };


    //!---------------------------------------------------------------------------------------------------


    // 2 -->  FUNCION RESEND CODE CONFIRMATION --> es un boton con evento onclick
    const handleSend = async() => {
        const userLocal = localStorage.getItem('user');
        if (userLocal != null) {
            // viene del login --> localStorage
            const parseUser = JSON.parse(userLocal);
            const custFormData = {
                email: parseUser.email,
            };
            setSend(true);
            setResResend(await resendCodeConfirmationUser(custFormData));
            setSend(false);
        } else {
            // viene del register --> allUser
            const custFormData = {
                email: allUser?.data?.user?.email,
            };
            setSend(true);
            setResResend(await resendCodeConfirmationUser(custFormData));
            setSend(false);
        }
    };


    //!---------------------------------------------------------------------------------------------------


    // 3 -->  HACEMOS USO DE USEEFFECT PARA GESTIONAR LOS ERRORES
    //Gestion del check code del usuario
    useEffect(() => {
        console.log("Res Check Code ✅", res);
        useCheckCodeError(
            res,
            setRes,
            setOkCheck,
            setOkDeleteUser,
            login,
            setUserNotFound
        );
    }, [res]);

    //Gestion del reenvio de codigo de confirmacion
    useEffect(() => {
        console.log("Resend Check Code 📫", resResend);
        useResendCodeError(
            resResend,
            setResResend,
            setUserNotFound
        );
    }, [resResend]);


    //!---------------------------------------------------------------------------------------------------


    // 4 -->  CONDICIONALES PARA CHECKEAR LOS ESTADOS DE NAVEGACION
    if(okCheck){
        //Hacemos AUTOLOGIN para cuando el usuario viene del register
        //Si el usuario viene del login lo gestionamos con useCheckCodeError

        //Empezamos modificando el localStorage
        if(!localStorage.getItem('user')){
            // --> Si el localStorage esta vacio entonces viene del register --> ALLUSER
            useAutoLogin(allUser, login);

        }else{
            //Hay user en el localStorage --> viene del login
            return <Navigate to="/dashboard"/>
        };
    };

    if(okDeleteUser){
        //Aqui habriamos borrado al usuario por meter mal el codigo de confirmacion
        //--> LE REENVIAMOS AL REGISTER
        return <Navigate to="/register" />
    };

    if(userNotFound){
        //Lo mandamos de vuelta al login --> si ha recargado la pagina no puedo recuperar el mail
        return <Navigate to="/login" />
    };

    return(
        <>
        <div className="form-wrap form-wrap-color">
            <h1>Verificar tu cuenta 👌</h1>
            <p>Escribe aquí el código que hemos enviado a tu email</p>
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
                <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("confirmationCode", { required: false })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Código de registro
                </label>
            </div>

            <div className="btn_container">
                <button
                id="btnCheck"
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#fac07e" : "#fc8906" }}
                >
                Verificar código
                </button>
            </div>
            <div className="btn_container">
                <button
                id="btnResend"
                className="btn"
                disabled={send}
                style={{ background: send ? "#fac07e" : "#fc8906" }}
                onClick={() => handleSend()}
                >
                Reenviar código
                </button>
            </div>

            <p className="bottom-text">
                <small>
                Si el codigo no es correcto, tu usuario será borrado de la base de datos y 
                tendrás que registrarte de nuevo {" "}
                </small>
            </p>
            </form>
        </div>
    </>
    );
};