//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#1: Variables

/* let myFavoriteHero = "Hulk";
let x = 50;
let h = 5;
let y = 10;
let z = h+y;

console.log(); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#𝟮: Variables avanzadas

/* const character = {name: 'Jack Sparrow', age: 10};
character.age = 25;
console.log(character.age);

let firstName = 'Jon'; 
let lastName = 'Snow'; 
let age = 24; 
console.log(`Soy ${firstName} ${lastName}, tengo ${age} años y me gustan los lobos.`);

const toy1 = {name: 'Buss myYear', price: 19};
const toy2 = {name: 'Rallo mcKing', price: 29};
console.log(toy1.price + toy2.price);

let globalBasePrice = 10000;
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};
globalBasePrice = 25000;
car1.finalPrice = car1.basePrice + globalBasePrice;
car2.finalPrice = car2.basePrice + globalBasePrice;
console.log(car1.finalPrice);
console.log(car2.finalPrice); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#3: Operadores
/* console.log(10*5);
console.log(10/2);
console.log(15%9);

let p = 10;
let j = 5;
let o = p+j;

let c =10;
let m = 5;
let i = 10*5; */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#4: Arrays (en GIT me he equivocado y he subido dos veces la Iteracion3)
/* const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
console.log(avengers[0]);

avengers[0]="IRONMAN";
console.log(avengers);

console.log(avengers.length);

const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
rickAndMortyCharacters.push("Morty");
rickAndMortyCharacters.push("Summer");
console.log(rickAndMortyCharacters);
console.log(rickAndMortyCharacters[rickAndMortyCharacters.length-1]);

rickAndMortyCharacters.push("Lapiz Lopez")
console.log(rickAndMortyCharacters);
rickAndMortyCharacters.pop() 
console.log(`El primer elemento de la lista es ${rickAndMortyCharacters[0]}`);
console.log(`El últumo elemento de la lista es ${rickAndMortyCharacters[rickAndMortyCharacters.length-1]}`);

rickAndMortyCharacters.push("Lapiz Lopez")
rickAndMortyCharacters.splice(1,1);
console.log(rickAndMortyCharacters); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#5: Condicionales
/* const number1 = 10;
const number2 = 20;
const number3 = 2;

if(number1 === 10){
    console.log('number1 es estrictamente igual a 10')
}

if (number2/number1 == 2) {
    console.log("number2 dividido entre number1 es igual a 2");
}

if (number1 !== number2) {
    console.log("number1 es estrictamente distinto a number2");
}

if (number3 != number1) {
    console.log("number3 es distinto number1");
}

if (number3*5 == number1) {
    console.log("number3 por 5 es igual a number1");
}

if (number3*5 == number1 && number1*2 == number2) {
    console.log("number3 por 5 es igual a number1 Y number1 por 2 es igual a number2");
}

if (number2/2 == number1 || number1/5 == number3) {
    console.log("number2 entre 2 es igual a number1 O number1 entre 5 es igual a number3");
} */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#6: Bucles
for (let i=0; i<10; i++){
    console.log(i);
}

for (let i=0; i<10; i++){
    if (i%2 == 0) {
        console.log(i);
    }
}

for (let i=0; i<10; i++){
    if (i != 9) {
        console.log('Intentando dormir 🐑');
    }
    else {
        console.log('Dormido!');
    }
}

