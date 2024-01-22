//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#𝟭: 𝗠𝗶𝘅 𝗳𝗼𝗿 𝗲 𝗶𝗻𝗰𝗹𝘂𝗱𝗲𝘀
const movies = [
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

console.log(categories);