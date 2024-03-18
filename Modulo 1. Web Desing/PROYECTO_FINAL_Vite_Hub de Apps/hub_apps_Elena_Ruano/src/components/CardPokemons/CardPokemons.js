import { getUserData, setUserData } from "../../global/state/globalState";
import "./CardPokemons.css";


/**Primero creamos la base de cada una de las cartas pokemon */
export const CardsPokemons = (data) => { 

    const appUser = getUserData ();
    /**Primero nos traemos los datos del usuario en sesión para almacenar sus favoritos */

    document.getElementById("galleryPokemon").innerHTML = ""; /**Empezamos borrando la galeria por si ya había algo */

    data.map((pokemon) => { /**Empezamos usando map para recorrer */
        const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`;

        const templateFigure = `<figure class=${classCustomType} id=${pokemon.id}>
            <img src=${pokemon.image} alt=${pokemon.name} id="poke-image"/>
            <h2>${pokemon.name}</h2>
            <span class="material-symbols-outlined  ${ /**Para que este span sea clicable debemos añadir un listener al final */
                appUser.fav.includes(pokemon.id.toString()) ? "like" : ""}"> ♥ </span>
        </figure>`;

        document.getElementById("galleryPokemon").innerHTML += templateFigure;
    
        addListeners(data); /**Listener para el span */
    });
};


/**Una vez creada la base podemos crear las interacciones usando Listeners */
const addListeners = (data) => {
    /**De nuevo traemos el usuario logeado para saber que FAVs tiene ya añadidu en el array de IDs de pokemons*/
    const appUser = getUserData ();

    /**Recorremos todos los SPAN que realmente son los botones de FAV en cada carta pokemon */
    const spanAll = document.querySelectorAll("span");
    spanAll.forEach((span) => {
        span.addEventListener("click", (e) => {
            /**Hacemos un TOGGLE --> si el corazone estaba ya en FAV, lo quito, si no lo estaba, lo pongo. Usamos un condicional para ello*/
            if (appUser.fav.includes(e.target.parentNode.id)){ /**Si esta en favoritos ya, tenemos que sacarlo */
                const appUser = getUserData();
                const newFavArray = []; /**Para ello creamos una nueva lista, donde pegamos todos los ID que ya estaban en FAV menos el que acabamos de selecionar */
                appUser.fav.forEach((id) => {
                    if(e.target.parentNode.id != id) newFavArray.push(id);
                });

                setUserData({ /**Seteamos la nueva lista de favoritos en el Storage */
                    ...appUser,
                    fav: newFavArray,
                });

                
            }

            else{ /**Si aun no era FAV, simplemente lo añadimos a la lista de FAVs del usuario logeado */
                const appUser = getUserData();
                appUser.fav.push(e.target.parentNode.id);
                setUserData(appUser);

                span.classList.toggle("like"); /**Añadimos la clase "like" al elemento que hemos dado me gusta */
            }
        });
    });
};