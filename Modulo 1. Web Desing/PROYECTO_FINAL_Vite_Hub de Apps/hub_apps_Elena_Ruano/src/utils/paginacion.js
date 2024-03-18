import { CardsPokemons } from "../components";

export const Paginacion = (data, numberElement) => { /**CREAR BOTONES Y PAGINACION */
    /**PARAMETROS:
     *  --> data total a paginar
     *  --> elementos qu queremos por cada página
     * 
     * Para ello calculamos la longitud del array total para dividirlo entre el numero de elemento y asi saber cuantas
     * paginas habra:
     */

    const longitud = data.length;
    const numberDigitOfPage = longitud / numberElement;

    document.getElementById("paginacion").innerHTML = ""; /**Reiniciamos la paginacion asi */

    if (numberDigitOfPage > 1){
        for (let i=0; i<numberDigitOfPage; i++){ /**La paginacion tendra lugar solo si el numero de paginas es mayor que 1 */
            const buttonNumber = document.createElement("button");
            buttonNumber.setAttribute("class", `${i + 1} buttonPaginacion`);
            buttonNumber.innerHTML = i + 1;

            /**En el elemento id=paginacion de nuestro HTML le anidamos todos los botones de la pagina y les damos
             * listeners a nuestros botones
            */
            document.getElementById("paginacion").appendChild(buttonNumber);
            addListeners(buttonNumber, data, numberElement, i);
        }
        
        /**Le damos estilos a los botones que se van creando */
        const allButton = document.querySelectorAll(".buttonPaginacion");
        allButton.forEach((pag) => {
            pag.style.border = "solid 3px #0000006d ";
        });
        allButton[0].style.border = "solid 3px #15a00e7d";
        allButton[0].style.color = " #083905ff";
    };

    CardsPokemons(data.slice(0, numberElement));
};


/**ESCUCHADORES DE LOS EVENTOS DE LOS BOTONES DE LA PAGINA*/
const addListeners = (buttonNumber, data, numberElement, i) => {
    /**PARAMETROS:
     *  --> buttonNumber es el boton que acabo de crear al cual vamos a dar un evento
     *  --> data son todos lo datos que queremos incluir
     *  --> numberElement son el numero de elemento que queremos por pagina
     *  --> i es el indice del bucle que crea todos los botones de la pagina
     */

    buttonNumber.addEventListener("click", () => {
        console.log("Estoy en la funcion addListener para dar evento a mis botones");

        const allButtonPag = document.querySelectorAll(".buttonPaginacion"); /**Seleccionamos todos los botones */
        /**Y les damos un estilo */
        allButtonPag.forEach((pag) => {
            pag.style.border = "solid 3px #0000006d ";
        });
        buttonNumber.style.border = "solid 3px #15a00e7d ";
        buttonNumber.style.color = " #093f06ff";

        /**Por ultimo haciendo uso del indice del array jugamos con eso para saber donde hacer un salto de pagina 
         * en nuestra paginacion, en la linea de cartas
         */
        const end = (i + 1) * numberElement;
        const start = end - numberElement < 0 ? 0 : end - numberElement;

        CardsPokemons(data.slice(start, end));
    });    
};