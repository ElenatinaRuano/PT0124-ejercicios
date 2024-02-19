import { setUser, setUserData } from "../../global/state/globalState";
import {initControler} from "../../utils/route";
import "./Login.css";


const template = () =>`
<div id="main">
    <div id="color-up"></div>

    <div id="color-center">
        <div id="containerLogin" class="align">
        <div clas="vide"></div>
            <h1 id="titleLogin">¡HOLA!</h1>
            <p>Introduce tu nombre de usuario:</p>
            <input type="text" name="username" id="username" />
            <button id="buttonLogin">GO!</button>
            <div clas="vide"></div>
        </div>
    </div>

    <div id="color-down"></div>

</div>
`;

const addListeners = () => {
    const buttonLogin = document.getElementById("buttonLogin"); /**id del buttom */
    const username = document.getElementById("username"); /**id del input */
    buttonLogin.addEventListener("click", (e) => {
        const valueInput = username.value;
    


        /**Comprobamos si en el localStorage hay un usario con ese nombre */
        if (localStorage.getItem(`${valueInput}`)) {
            const localUser = localStorage.getItem(`${valueInput}`);
            const parseUser = JSON.parse(localUser);
        

            /**IMPORTANTE --> si ya estoy log, poner el token de autificación en TRUE */
            parseUser.token = true;

            /**Una vez el token es TRUE lo devolvemos al storage en forma de JSON*/
            const stringUser = JSON.stringify(parseUser);
            localStorage.setItem(`${valueInput}`, stringUser);
            sessionStorage.setItem("currentUser", `${valueInput}`);

            /**Una vez preparado en formato JSON, usamos SET para settear la información del usuario actual */
            setUser(`${valueInput}`);
            setUserData(parseUser);
        }
        
        else{ /**Si el usuario no esta resgistrado aun en el localStorage, lo creamos */
            const customUser = {
                name: username.value,
                fav: [],
                token: true,
            };

            /**Y repetimos el proceso para settear sus datos en el localStorage */
            const stringUser = JSON.stringify(customUser);
            localStorage.setItem(`${valueInput}`, stringUser);
            sessionStorage.setItem("currentUser", `${valueInput}`);

            setUser(`${valueInput}`);
            setUserData(customUser);
        }

        /**Por ultimo, llamamos al initControler sin el parametro para que compruebe que se ha metido 
        * el userCurrent en el sessionStorage  */
        console.log(localStorage.getItem(`${valueInput}`));
        initControler();
    });
};



export const Login = () => {
    /**Si abrimos el login debemos ocultar la barra nav */
    document.querySelector("nav").style.display="none";
    document.querySelector("main").innerHTML = template();
    addListeners();
};