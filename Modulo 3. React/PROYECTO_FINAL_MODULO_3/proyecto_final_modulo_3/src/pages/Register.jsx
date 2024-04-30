import "./Register.css";
import { useEffect, useState } from "react";
import { registerUser } from "../services/user.service";
import { useForm } from "react-hook-form";
import { Uploadfile } from "../components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRegisterError } from "../hooks/useRegisterError";
import { useAuth } from "../context/authContext";

export const Register = () => {
    //ESTADOS
    const [send, setSend] = useState(false); //--> Se coloca antes y despues de una funcion asincrona para saber cuando empieza ya acaba
    const [res, setRes] = useState({}); // -->respuesta
    const [okRegister, setOkRegister] = useState(false); // --> Viene del useRegisterError 
    const { register, handleSubmit } = useForm(); // --> metodo de React para trabajar con formularios
    const { allUser, setAllUser, bridgeData } = useAuth();
    const navigate = useNavigate();
    const { userInfo, setUserInfo} = useState({
        user: {
                image:'',
                email: '',
                gender: '',
                name: ''
        },
    });


    //!---------------------------------------------------------------------------------------------------

    // 1 -->  CREAMOS LA FUNCION QUE SE ENCARGA DEL FORMULARIO
    const formSubmit = async(formData) => {
        const inputFile = document.getElementById('file-upload').files; //--> Necesitamos sabes si tenemos una imagen
        
        if(inputFile.length != 0) { // --> Si es distinto de 0 significa que si hay una imagen
            const customFormData = {
                ...formData,
                image: inputFile[0],
            };

            setSend(true); // --> send en true para saber que empieza la funcion asincrona
            setRes(await registerUser(customFormData));
            setSend(false); // --> una vez finalizada declaramos send en false para indicar que ha terminado

        }else{
            const customFormData = {
                ...formData,
            };

            setSend(true);
            setRes(await registerUser(customFormData));
            setSend(false);
        }
    };


    //!---------------------------------------------------------------------------------------------------

    // 2 -->  USAMOS USEEFFECT PARA GESTIONAR LOS ERRORES Y LAS RESPUESTAS (useRegisterError.jsx)
    useEffect(() => {
        console.log('Soy res 🥶 de useEffect en  el register', res);
        useRegisterError(res, setOkRegister, setRes);
        if(res?.status == 200) bridgeData("ALLUSER");
    }, [res]);

    useEffect(() => {
        console.log("Soy la funcion allUser 😀", allUser);
    }, [allUser]);


    //!--------------------------------------------------------------------------------------------------

    // 3 --> ESTADOS DE NAVECACION
    if(okRegister){ //Si en useRegisterError == 200 --> nos deriba a la pagina para verificar el codigo
        return <Navigate to='/verifyCode'/> 
    }

    return ( //Si el okRegister es false --> el usuario debe realizar el registro
        <>
            <div className="form-wrap form-wrap-color">
            <h1>Regístrate</h1>
            <p>Es gratis y solo te llevara unos minutos</p>
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
                <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("name", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                nombre de usuario
                </label>
            </div>
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

                <div className="sexo">
                    <input
                        type="radio"
                        name="sexo"
                        id="masculino"
                        value="masculino"
                        {...register("gender")}
                    />
                    <label htmlFor="masculino" className="label-radio hombre">
                        Masculino
                    </label>
                    <input
                        type="radio"
                        name="sexo"
                        id="femenino"
                        value="femenino"
                        {...register("gender")}
                    />
                    <label htmlFor="femenino" className="label-radio mujer">
                        Femenino
                    </label>
                    <input
                        type="radio"
                        name="sexo"
                        id="otro"
                        value="otro"
                        {...register("gender")}
                    />
                    <label htmlFor="otro" className="label-radio otro">
                        Otro
                    </label>
                </div>
                <Uploadfile />
            </div>

            <div className="btn_container">
                <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#fac07e" : "#fc8906" }}
                >
                { send ? "Cargando..." : "Enviar" }
                </button>
            </div>
            <p className="bottom-text">
                <small>
                Haciendo click en Enviar, tu estas aceptando: {" "}
                <Link className="anchorCustom">Terminos y condiciones</Link> y{" "}
                <Link className="anchorCustom">Politica de privacidad</Link>
                </small>
            </p>
            </form>
        </div>
        <div className="footerForm">
            <p className="parrafoLogin">
            ¿Ya tienes una cuenta con nosotros? <Link to="/login">Inicia sesión aqui</Link>
            </p>
        </div>
        </>
    )
};

