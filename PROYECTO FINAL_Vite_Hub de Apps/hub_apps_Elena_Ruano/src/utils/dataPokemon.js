import { setData } from "../global/state/globalState";
import { getByIdPokemon } from "../services/pokemon.service";
import { Paginacion } from "./paginacion";
import { typePokemon } from "./typePokemon"; 

let dataGlobal;

/**Trae los datos de la API de pokemon y hace push en un array vacio*/
export const dataPokemon = async () => {
    const rawData = [];

    for (let i=1; i<151; i++){
        rawData.push(await getByIdPokemon(i));
    };

    return dataMap(rawData);
};


const dataMap = (data) => {
    const filterData = data.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites.other["showdown"].front_default,
        type: pokemon.types,
        id: pokemon.id,
    }));
    /** en este caso llama a una funcion que crea un array con los nombres de los tipos de pokemon */
    const types = typePokemon(filterData);
    dataGlobal = {
        pokemonData: filterData,
        type: types,
    };

    return dataGlobal;
};


export const filterPokemon = (filterDataInputButton, donde) => {
    /**PARAMETROS:
     *  --> donde : es si quiero hacerlo por type en los botones o por nombre en el input
     *  --> filterDataInputButton:  la palabra que nos sirve para filtrar
     */

    switch (donde) {
        case "type": /**Filtro si se hace una busqueda por tipos */
            {
                const filterData = dataGlobal.pokemonData.filter((pokemon) =>
                    pokemon.type[0].type.name
                    .toLowerCase()
                    .includes(filterDataInputButton.toLowerCase())
                );
        
                /** En caso de que en la primera posicion no se encuentre ese tipo de pokemon tendremos que buscarlos
                 * en la posicion 1 del array de los tipos de pokemons
                 */
        
                if (filterData.length === 0) {
                    const filterData = dataGlobal.pokemonData.filter((pokemon) =>
                    pokemon.type[1]?.type.name
                        .toLowerCase()
                        .includes(filterDataInputButton.toLowerCase())
                    );
        
                    /** Una vez filtrada la info la mandamos a la funcion paginar para que renderice el numero de elementos
                   * que le decimos como parametrom, en este caso tres
                   */
        
                    Paginacion(filterData, 14);
                } else {
                    Paginacion(filterData, 14);
                }
            };
            break;

            case "name": /**Filtro si se hace una busqueda por nombres */
                {
                    const filterData = dataGlobal.pokemonData.filter((pokemon) =>
                    pokemon.name
                        .toLowerCase()
                        .includes(filterDataInputButton.toLowerCase())
                    );

                    if (filterDataInputButton == "") {
                        Paginacion(filterData, 30);
                    } else {
                        Paginacion(filterData, 5);
                    }
                }
                break;
    };
};


export const getInfo = async () => {
    console.log("actualizando info... 👌🔍");
    const data = await dataPokemon();
    setData(data, "Pokemon");
};

/** ejecutamos la funcion getInfo para cuando se monte la aplicacion se hagan las llamadas asincronas
 * y asi tengamos la info ya preparada para cuando entremos a pokemon
 */
getInfo();