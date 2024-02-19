import { QuizQuestion } from "../../utils"
import "./Pokequiz.css"

const template = () =>`
    <div id=mainPokequiz>
        <div id="main-container">
        </div>
    </div>
`;


/**FUNCION PARA IMPRIMIR LA PAGINA DE POKEMON */
export const PrintPokeQuizPage = () => {
    document.querySelector("main").innerHTML = template();
    document.getElementById("div-change-color").style.display = "flex";

    QuizQuestion(0);
};

