import "./Login.css";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUserService } from "../services/user.service";
import { useLoginError } from "../hooks/useLoginError"; 
import { Link, Navigate } from "react-router-dom";

export const Login = () => {
    //ESTADOS
    const [send, setSend] = useState(false);
    const [res, setRes] = useState({});
    const { login, setUser } = useAuth();
    const [loginOk, setLoginOk] = useState(false);
    const { register, handleSubmit } = useForm();


    //!---------------------------------------------------------------------------------------------------


    // 1 -->  CREAMOS LAS FUNCION QUE SE ENCARGA DEL FORMULARIO
    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await loginUserService(formData));
        setSend(false);
    };


    //!---------------------------------------------------------------------------------------------------


    // 2 -->  USO DE USEEFFECT PARA CONTROLAR LOS ERRORES
    // a) Lo primero es gestionar los errores de la respuesta
    useEffect(() => {
        console.log('Hemos entrado en el login 😀', res);
        useLoginError(res, setRes, login, setLoginOk)
    }, [res]);

    /** b)Una vez gestionados lo errores comprobamos la situacion del usuario:
     *     --> Usuario logueado pero no checkeado ---> desloguea al usuario borrandolo del localStorage
     */
    useEffect(() => {
        setUser(() => null);
        localStorage.removeItem('user');
    }, []);


    //!---------------------------------------------------------------------------------------------------


    // 3 -->  CONDICIONES QUE GESTIONAN EL ESTADO DE NAVEGACION
    if(loginOk) { //Si el usuario esta logueado
        if(res.data.user.check == false) {//Pero no ha hecho el check
            return <Navigate to='/verifyCode'/> //Lo mandamos a la pagina de verificaciond e codigo
        
        }else{
            return <Navigate to='/dashboard'/> //Si hace loguin y esta checkeado lo enviamos a su dashboard
        }
    };

    return (
        <>
        <div className="form-wrap form-wrap-color">
            <h1>Inicio de sesión</h1>
            <p>⭐ Estamos felices de verte de nuevo por aquí ⭐</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="email_container form-group">
                <input
                    className="input_user"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="false"
                    {...register("email", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                    email
                </label>
    
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
                    contraseña
                    </label>
                </div>
                </div>
    
                <div className="btn_container">
                <button
                    className="btn"
                    type="submit"
                    disabled={send}
                    style={{ background: send ? "#fac07e" : "#fc8906" }}
                >
                    LOGIN
                </button>
                </div>
                <p className="bottom-text">
                <small>
                    ¿Has olvidado tu contraseña? No te preocupes
                    <Link to="/forgotpassword" className="anchorCustom">
                    Cambiar contraseña aqui
                    </Link>
                </small>
                </p>
            </form>
            </div>
            <div className="footerForm">
            <p className="parrafoLogin">
                ¿Todavia no te has registrado? <Link to="/register">Registrate aquí</Link>
            </p>
            </div>
        </>
    )
}