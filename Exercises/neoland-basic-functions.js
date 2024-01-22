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

const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
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

console.log(findLongestWord(avengers));