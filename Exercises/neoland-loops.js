//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#1: Usa includes

/* const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta']

for (let i=0; i<products.length; i++){
    if (products[i].includes("Camiseta")){
        console.log(products[i]);
    }
} */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#2: Condicionales avanzados

/* const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
	{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
	{name: 'Juan Miranda', T1: false, T2: true, T3: true},
	{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
	{name: 'Raquel Benito', T1: true, T2: true, T3: true}
]

alumns.forEach((alumns)=>{
    let aprobados = 0
    for (let items in alumns){
        if (alumns[items] == true){
            aprobados += 1;
            console.log("entro");
        }
    }
    
    if (aprobados >= 2){
        alumns.isApproved = true
    }
    else {
        alumns.isApproved = false
    }

})

console.log(alumns); */



//* 𝗜𝘁𝗲𝗿𝗮𝗰𝗶ó𝗻#3: Probando For...of

const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar']

for (cities of placesToTravel) {
    console.log(cities);
}