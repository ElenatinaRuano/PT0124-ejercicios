//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#𝟭: 𝗠𝗶𝘅 𝗳𝗼𝗿 𝗲 𝗶𝗻𝗰𝗹𝘂𝗱𝗲𝘀
/* const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]

let categories = [];

for (let movie of movies){
    for(let subCategorie of movie["categories"]){
        if(!categories.includes(subCategorie)){
            categories.push(subCategorie);
        }
    }
}

console.log(categories); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#2: Mix Fors
const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]


let mediaVolumen = 0;
let volumenTotal = 0;
let dividendo = 0; //Necesitamos saber cuantos elementos hay para hallar la media

for(let user of users){
    for(let sound in user["favoritesSounds"]){
        volumenTotal += user["favoritesSounds"][sound].volume;
        dividendo ++;
    }
}

mediaVolumen = volumenTotal / dividendo;
console.log(mediaVolumen);
console.log(users[1].favoritesSounds);




