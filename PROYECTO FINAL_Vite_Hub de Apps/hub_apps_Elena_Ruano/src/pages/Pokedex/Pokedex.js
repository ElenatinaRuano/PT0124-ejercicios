import {
    CardsPokemons,
    PrintButton,
    } from "../../components";
import { getData } from "../../global/state/globalState";
import { Paginacion, filterPokemon } from "../../utils";
import "./Pokedex.css";

const template = () =>`
    <div id=mainPokedex>
        <div id="pokemon">
            <div id="filterButton"></div>
            <div id="containerFilter">
            <div id="filterByName"><div id="textBrowser">¿QUE POKEMON ESTAS BUSCANDO?</div><input
                type="text"
                id="inputPokemon"
                placeholder="Ejemplo: Pikachu"
            /></div>
            
            </div>
            <div id="paginacion"></div>
            <div id="galleryPokemon"></div>
        </div>
    </div>
`;

/**TRAER DATOS DE POKEMON AL CONTEXTO */
const dataService = async () => {
    const getDataPokemon = getData("Pokemon"); /**Nos traemos los datos pokemon */ 
    const { pokemonData, type } = getDataPokemon;

    PrintButton(type);
    addListeners();
    Paginacion(pokemonData, 40);
};


/**EVENTOS PARA EL INPUT */
const addListeners = () => {
    const inputPokemon = document.getElementById("inputPokemon");
    inputPokemon.addEventListener("input", (e) => {

        filterPokemon(e.target.value, "name"); /**este input envia el valor del filtro, por nombre o por tipo */
    });
};


/**FUNCION PARA IMPRIMIR LA PAGINA DE POKEMON */
export const PrintPokedexPage = () => {
    document.querySelector("main").innerHTML = template();
    document.querySelector("nav").style.display = "flex";
    document.getElementById("div-change-color").style.display = "none";

    dataService();
};