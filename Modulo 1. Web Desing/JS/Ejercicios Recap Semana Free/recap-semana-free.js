//*EJERCICIOS RECUP SEMANA FREE


//*EJERCICIO 1
for (let i=0; i<=50; i+=5){
    console.log(i);
}



//*EJERCICIO 2
for (let i=50; i>0; i-=5){
    console.log(i);
}



//*EJERCICIO 3
let numerosAlearotios = [];

for(let i=0; i<10; i++){
    numerosAlearotios.push(Math.floor(Math.random()*100)+1);
}

console.log(numerosAlearotios);



//*EJERCICIO 4
let	colores	=	["azul",	"verde",	"rosa",	"naranja",	"rojo",	"marron"];
let rosa = colores[2];
console.log(rosa);



//*EJERCICIO 5
let color0 = colores[0][0];
console.log(color0);



//*EJERCICIO 6
let	frase	=	["posiciones", "se cuentan", "Las",	"array", "cero.", "a partir", "del"];
console.log(`${frase[2]} ${frase[0]} ${frase[6]} ${frase[3]} ${frase[1]} ${frase[5]} ${frase[6]} ${frase[4]}`);



//*EJERCICIO 7
let listaPrueba1 = [1, 2, 3];
let listaPrueba2 = [4 ,5 ,6];

function unirListas(l1, l2) {
    return l1.concat(l2)
}

let listaResultante1 = unirListas (listaPrueba1, listaPrueba2)
console.log(listaResultante1);



//*EJERCICIO 8
function agregarPrimerElemento(l1, l2) {
    return l2.push(l1.pop());
}

agregarPrimerElemento(listaPrueba1, listaPrueba2);
console.log(listaPrueba2);



//*EJERCICIO 9
let	array1 = [1, 2, [3, 4]];
let	array2 = [1, 2, [3, 4, [5, 6]]];

console.log(array1.flat());
console.log(array2.flat());



//*EJERCICIO 10
let	coloresDesordenados = ["azul", "verde", "rosa", "naranja", "rojo", "marron"];
let coloresOrdenados = coloresDesordenados.sort().reverse();
console.log(coloresOrdenados);



//*EJERCICIO 11
let	numerosDesordenados	= [40, 100, 1, 5, 25, 10];	
let numerosOrdenados = numerosDesordenados.sort(function(a, b){return a - b});
console.log(numerosOrdenados);



//*EJERCICIO 12
function generarFibonacci(longuitud) {
    let listaFibonacci = [0, 1, 1];
    
    for(let i=2; i<longuitud; i++) {
        listaFibonacci.push(listaFibonacci[i]+listaFibonacci[i-1]);
    }

    return listaFibonacci;
}

console.log(generarFibonacci(10));



//*EJERCICIO 13
function convertirAFarenheit(celsius) {
    return (celsius * 1.8) +32;
}

console.log(convertirAFarenheit(25));



//*EJERCICIO 14
let convertirAFarenheitArrow = (celsius) => (celsius * 1.8) +32;

console.log(convertirAFarenheitArrow(25));



//*EJERCICIO 15
function comprobarMayusMinus (frase){
    if (frase.toUpperCase() === frase){
        return (`La frase: "${frase}" esta escrita en MAYUSCULAS`);
    }
    else if (frase.toLowerCase() === frase){
        return (`La frase: "${frase}" esta escrita en minusculas`);
    }
    else{
        return (`La frase: "${frase}" esta escrita con MAYUSCULAS y minusculas`);
    }
}

console.log(comprobarMayusMinus("HOLA MUNDO"));
console.log(comprobarMayusMinus("hola mundo"));
console.log(comprobarMayusMinus("Hola Mundo"));



//*EJERCICIO 16
function isPalindromo (frase){
    let fraseMinus = frase.toLowerCase(); //Pasamos la frase a minusculas
    let fraseSinEspacios = ""; // Declaramos un string vacio para almacenar la frase sin espacios

    for (let i=0; i<fraseMinus.length; i++){ //Creamos un bucle para eliminar los espacios
        if (fraseMinus[i] != " "){
            fraseSinEspacios += fraseMinus[i];
        }
    }

    let arraySinEspacios = fraseSinEspacios.split(""); //Transformamos el string en un array para poder usar .reverse()

    if (arraySinEspacios.reverse() === arraySinEspacios){
        return `La frase "${frase}" es un palindromo`
    }
    else{
        return `La frase "${frase}" NO es un palindromo`
    }
}

console.log(isPalindromo("Dabale arroz a la zorra el abad"));
console.log(isPalindromo("Dabale arroz a la gallina el abad"));




//*EJERCICIO 17
const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

let diasConM = [];

for (let dia of dias){
    if(dia[0] == "m"){
        diasConM.push(dia);
    }
}

console.log(diasConM);



//*EJERCICIO 18
let	num	= [100, 2, 20, 35, 4, 44];
let numFiltrado = num.sort((a, b) => a - b).filter((numero) => numero<10);
console.log(numFiltrado);



//*EJERCICIO 19
let sumaNumeros = num.reduce((a,b) => a+b);
console.log(sumaNumeros);



//*EJERCICIO 20
let a=[1,2,3,4];
let b=[1,2,5];

function compararListas(l1, l2) {
    let resultado = [];
    for (i=0; i<l1.length; i++){
        if (l2.includes(l1[i]) != true){
            resultado.push(l1[i]);
        }
    }

    for (i=0; i<l2.length; i++){
        if (l1.includes(l2[i]) != true){
            resultado.push(l2[i]);
        }
    }
    return resultado
}

console.log(compararListas(a,b));




//*EJERCICIO 21
let fruta = {};

fruta.tipo = "dulce";
fruta.color = "rosa";
fruta.peso = "3g";

console.log(fruta);



//*EJERCICIO 22
let	jugadores = [
    {nombre: "Ana",	puntos:	[21,3,5,78,25],	temporada: false},
    {nombre: "Pedro", puntos: [55,66,77,55,66],	temporada: true},
    {nombre: "Juan", puntos: [12,83,40,65,10],	temporada: true},
    {nombre: "Marta", puntos: [24,90,36,78,20],	temporada: true},
];

function mejorJugador(list) {
    let mejorMedia = 0;
    let indexMejorJugador = 0;
    let mediaJugador = 0;

    for (let jugador of jugadores){
        mediaJugador = jugador.puntos.reduce((a,b) => a+b) / jugador.puntos.length;
        
        if (mediaJugador > mejorMedia){
            mejorMedia = mediaJugador;
            indexMejorJugador = list.indexOf(jugador);
        }
    }

    return `El jugador ${list[indexMejorJugador].nombre} tiene la mejor puntuación, con una media de ${mejorMedia}. En la siguiente temporada ${list[indexMejorJugador].temporada ? "si jugará" : "no jugará"}`
}


console.log(mejorJugador(jugadores));



//*EJERCICIO 23
let estudiantes = {
    bea : 5,
    angel : 8,
    elena : 2,
    javier : 4,
    sandra : 9,
}

function sacarMedia(objeto) {
    let sumaVotos = 0;
    let baseMedia = 0;
    let mediaVotos;

    for (let item in objeto){
        sumaVotos += objeto[item];
        baseMedia ++;
    }

    mediaVotos = sumaVotos/baseMedia;
    mediaVotos *= 1.1;
    mediaVotos = Math.round(mediaVotos);

    return mediaVotos
    
}

let mediaEstudiantes = sacarMedia(estudiantes);


function sacarSuspAprov(mediaBase, objetos) {
    let resultados = {};

    for (item in objetos){
        if (objetos[item] > mediaBase){ //Si el estudiante tiene menos nota que la media calculada, esta supenso
            resultados[item] = `Aprobado con un ${objetos[item] }`
        }
        else {
            resultados[item] = `Suspenso con un ${objetos[item] }`
        }
    }

    return resultados
}

let notasFinales = sacarSuspAprov(mediaEstudiantes, estudiantes);

console.log(notasFinales);



//*EJERCICIO 24
const trabajadores = {
    Pedro: {
        puesto: 'empleado',
        edad: 40
    },
    Ana: {
        puesto:	'becario',
        edad: 34
    },
    Mike: {
        puesto:	'becario',
        edad: 37
    },
    Oscar: {
        puesto:	'empleado',
        edad: 35
    },
    Juan: {
        puesto:	'becario',
        edad: 29
    },
    Marta: {
        puesto:	'jefe',
        edad: 26
    },
    Maria: {
        puesto:	'empleado',
        edad: 28
    },
    Pablo: {
        puesto:	'jefe',
        edad: 36
    },
}

let trabajadoresOrdenados = {jefes:[], empleados:[], becarios:[]};
let jefes = [];
let empleados = [];
let becarios = [];



for (let trabajador in trabajadores){
    if (trabajadores[trabajador].puesto === 'jefe'){
        jefes.push({nombre:`${trabajador}`, edad:trabajadores[trabajador].edad}) 
    }
    else if (trabajadores[trabajador].puesto === 'empleado'){
        empleados.push({nombre:`${trabajador}`, edad:trabajadores[trabajador].edad})
    }
    else {
        becarios.push({nombre:`${trabajador}`, edad:trabajadores[trabajador].edad})
    }
} 

trabajadoresOrdenados.jefes = jefes.sort((a, b) => a.edad - b.edad);
trabajadoresOrdenados.empleados = empleados.sort((a, b) => a.edad - b.edad);
trabajadoresOrdenados.becarios = becarios.sort((a, b) => a.edad - b.edad);

console.log(trabajadoresOrdenados);


