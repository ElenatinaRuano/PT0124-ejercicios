import { PrintPokeQuizPage } from "../pages";

let rounds = 0; /**Rondas del juego */
let points = 0; /**Puntos obtenidos */


export const QuizQuestion = (number) => { 
    document.getElementById("main-container").innerHTML = "";

    const quizQuestions = [ /**Biblioteca de preguntas */
        {question: "Pikachu es el numero 25 de la pokedex" , answer:"true"},
        {question: "Charizard es mas grande que Snorlax" , answer:"false"},
        {question: "La primera generación de pokemon tiene lugar en la región de Kalos" , answer:"false"},
        {question: "El pokemon 'Rojo y Azul' salió antes al mercado que el pokemon 'Blanco y Negro'" , answer:"true"},
        {question: "La aventura del pokemon Rojo empieza en ciudad Lavanda" , answer:"false"},
        {question: "Corte es la primera MO que se consigue en la región de Kanto" , answer:"true"},
        {question: "Charizard es un pokemon de tipo dragon" , answer:"false"},
        {question: "Mewtwo es la evolución de Mew" , answer:"false"},
        {question: "Si usamos una piedra de fuego haremos que Vulpix evolucione" , answer:"true"},
        {question: "Los pokemon de tipo psíquico no tenian debilidades en la primera generación" , answer:"true"},
    ];

     /**Recorremos la lista para imprimirlas una a una en pantalla */

    if (rounds < 10) {
        const templateQuiz = `
            <span id="points">Puntuación: ${points}/10</span>
            <div id="question-container">
                <h2 id="question-QUIZ">${quizQuestions[number].question}</h2>
                <div id="answer">
                    <li class="answer-box" id="true"><div>Verdadero</div></li>
                    <li class="answer-box" id="false"><div>Falso</div></li>
                </>
                <buttom id="next" class="quizButtoms">Siguiente </buttom>
            </div>`;

        document.getElementById("main-container").innerHTML = templateQuiz;
            
        addListeners(quizQuestions, rounds); /**Listener para el span*/;
    }

    else {
        const templateQuiz = `
            <div id="question-container">
                <h2 id="question-QUIZ">Has conseguido ${points} puntos</h2>
                <div id="answer">
                    <li class="end"><div>Gracias por hacer mi pequeño PokeQuiz <3 </div></li>
                </>
                <buttom id="reiniciar" class="quizButtoms">Reiniciar</buttom>
            </div>`;

        document.getElementById("main-container").innerHTML = templateQuiz;
            
        addListeners(quizQuestions, rounds); /**Listener para el span*/;
    }
};

/**Por ultimo preparamos la funcion para que funcionen los botones de verdadero y falso */
const addListeners = (data, number) => {
    
    if(rounds == 10){
        const resetQuestion = document.getElementById("reiniciar");
        resetQuestion.addEventListener("click", (e) => {
            rounds = 0;
            console.log(rounds); /**Comprobamos que esta entrando en la condicion */
            points = 0;
            PrintPokeQuizPage();
        });

    }else if (data[number].answer == "true" && number<10) {
        const goodAnswer = document.getElementById("true");
        goodAnswer.addEventListener("click", (e) => {
            document.getElementById("true").style.background= "green";
            document.getElementById("false").style.background= "red";
            points++;
            console.log(points);
        });

        const badAnswer = document.getElementById("false");
        badAnswer.addEventListener("click", (e) => {
            document.getElementById("true").style.background= "green";
            document.getElementById("false").style.background= "red";
        });

    }else if (data[number].answer == "false" && number<10){
        const goodAnswer = document.getElementById("true");
        goodAnswer.addEventListener("click", (e) => {
            document.getElementById("true").style.background= "red";
            document.getElementById("false").style.background= "green";
        });

        const badAnswer = document.getElementById("false");
        badAnswer.addEventListener("click", (e) => {
            document.getElementById("true").style.background= "red";
            document.getElementById("false").style.background= "green";
            points++;
            console.log(points);
        });    
    };

    const nextQuestion = document.getElementById("next");
    nextQuestion.addEventListener("click", (e) => {
        rounds ++;
        console.log(rounds);
        QuizQuestion(rounds);
    });
};


            