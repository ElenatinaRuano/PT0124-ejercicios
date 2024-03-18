import { getUser } from "../../global/state/globalState";
import { changeColorRGB } from "../../utils";
import { initControler } from "../../utils/route";
import "./Header.css";


/**Creamos el template que contendrá nuestro codigo HTML para el header */
const template = () =>`<div id="header">
    <div id="logo" class="align">
        <img id="pokemon-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="logo" height="120px">
        <h1>HUB APP</h1>
    </div>

    <div id="divbuttons">
        <div id="div-change-color" class="align">
            <h3>¡Cambia el color aqui!</h3>
            <button id="change-color"><img src="https://upload.wikimedia.org/wikipedia/commons/3/38/BYR_color_wheel.svg" alt="colors" height="40px"></button>
        </div>
        <nav>
            <ul id="nav-options" class="align">
            <li><button id="dashboard">INICIO</button></li>
            <li><button id="pokedex">POKEDEX</button></li>
            <li><button id="pokequiz">POKEQUIZ</button></li>
            <li><button id="log-out">LOG OUT</button></li>
            </ul>
        </nav>
    </div>
</div>
`;

/**Añadimos eventos */
const addListeners = () => {
    /**Para cada boron gráfico que queramos que realice una función, tenemos que añadirle un es "listener" */

    //! --> CAMBIO COLOR DE FONDO DE LA PÁGINA:
    const changeColor = document.getElementById("change-color");
    changeColor.addEventListener("click", (e) => {
        const color = changeColorRGB();
        document.documentElement.style.setProperty("--randomColor", color);
    }); 

    //! --> DASHBOARD:
    const buttomDashboard = document.getElementById("dashboard");
    buttomDashboard.addEventListener("click", (e) => {
        initControler("Dashboard");
    });

    //! --> POKEDEX:
    const buttomPokedex = document.getElementById("pokedex");
    buttomPokedex.addEventListener("click", (e) => {
        initControler("Pokedex");
    });

    //! --> POKEQUIZ:
    const buttomPokequiz = document.getElementById("pokequiz");
    buttomPokequiz.addEventListener("click", (e) => {
        initControler("Pokequiz");
    });

    //! --> CERRAR SESIÓN:
    const buttomLogout = document.getElementById("log-out");
    buttomLogout.addEventListener("click", (e) => {
        const userState = getUser().name; /**Extraemos el nombre del usuario actualmente logado */
        const currentUser = localStorage.getItem(userState); /**Usamos ese dato para extraer la info del usuario del localStorage */
        const parseCurrentUser = JSON.parse(currentUser); /**Transformamos la info extraida en forma de JSON a JS con parse */
        const updateUser = { ...parseCurrentUser, token: false }; /**Cambiamos la info del token a FALSE */
        const stringUpdateUser = JSON.stringify(updateUser); 
        localStorage.removeItem(userState);
        sessionStorage.removeItem("currentUser");
        localStorage.setItem(userState, stringUpdateUser);

        /**Devolvemos la pagina de inicio */
        initControler("Login");
    });

    
};


export const PrintTemplateHeader = () => {
    document.querySelector("header").innerHTML = template();
    addListeners();
};