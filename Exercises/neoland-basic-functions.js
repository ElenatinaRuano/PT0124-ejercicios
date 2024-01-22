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
const numbers = [1, 2, 3, 5, 45, 37, 58];

function sumAll(param) {
    let sum = 0;
    for (let number of param){
        sum += number;
    }
    return sum;
}

console.log(sumAll(numbers));