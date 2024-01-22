//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#1: Buscar el máximo
/* function sum(numberOne , numberTwo) {
    if (numberOne>numberTwo){
        return numberOne
    }

    else {
        return numberTwo
    }
}

console.log(sum(1,5)) */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#2: Buscar la palabra más larga

/* const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
function findLongestWord(param) {
    
    let longMax = 0;
    let finalWord;

    for(let item of param){

        if (item.length > longMax) {
            longMax = item.length;
            finalWord = item;
        }
    }

    return finalWord;
}

console.log(findLongestWord(avengers)); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#3: Calcular la suma
/* const numbers = [1, 2, 3, 5, 45, 37, 58];

function sumAll(param) {
    let sum = 0;
    for (let number of param){
        sum += number;
    }
    return sum;
}

console.log(sumAll(numbers)); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#4: Calcular el promedio
/* const numbers = [12, 21, 38, 5, 45, 37, 6];
function average(param) {
    let sum = 0;
    let media = 0;
    for (let number of param){
        sum += number;
        media ++;
    }
    return sum/media;
}

console.log(average(numbers)) */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#5: Calcular promedio de string
const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
function averageWord(param) {
    let sum = 0;
    for (let item of param){
        if (typeof item == "number") {
            sum += item
        }
        else {
            sum += item.length;
        }
    }
    return sum;
}

console.log(averageWord(mixedElements));
