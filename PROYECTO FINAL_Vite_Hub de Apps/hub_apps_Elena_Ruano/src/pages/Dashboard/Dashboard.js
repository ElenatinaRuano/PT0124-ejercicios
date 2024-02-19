import { getData } from "../../global/state/globalState";
import { getInfo, initControler } from "../../utils";
import "./Dashboard.css";

const template = () => `
<div id="mainDashboard">
    <div id="color-up"></div>

    <div id="color-center">
        <div id="dashboard-pokedex" class="options align"><p id="buttom-pokedex">PokeDex</p></div>
        <div id="dashboard-pokequiz" class="options align"><p id="buttom-pokequiz">PokeQuiz</p></div>
    </div>

    <div id="color-down"></div>

</div>
`;


const addEventListeners = () => {
    const navigatePokedex = document.getElementById("buttom-pokedex");
    navigatePokedex.addEventListener("click", (e) => {
        initControler("Pokedex");
    });

    const navigatePokequiz = document.getElementById("buttom-pokequiz");
    navigatePokequiz.addEventListener("click", (e) => {
        initControler("Pokequiz");
    });
};


export const printTemplateDashboard = () => {
    /**Queremos que nuestro "mainDashboard" aparezca en el main del HTML, por lo que inyectamos la info en el main */
    document.querySelector("main").innerHTML = template ();

    /**Para la nav, que la habiamos ocultado en la pantalla de LOGIN, le devolvemos el valor flex para que se renderice */
    document.querySelector("nav").style.display = "flex";

    /** metemos los escuchadores de la pagina */
    addEventListeners();

    /** y por ultimo traemos la info que hace la llamada asincrona a la api de pokemon y lo setea en el estado*/
    getInfo(); 
};
