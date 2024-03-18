/**En enumOK vamos a crear dos funciones:
 *    ---> Una para verificar si el genero propuesto por el cliente es uno de los generos es nuestra lista
 *    ---> Lo mismo para la raza
*/

const enumGenderOk = (gender) => {
    const enumGender = ["masculino", "femenino", "otro"];
    if (enumGender.includes(gender)) {
        return { 
            check: true, 
            gender
        }
    } else {
        return { 
            check: false
        }
    };
};


const enumRaceOk = (race) => {
    const enumRace = ["ascendidos", "celestiales", "cyborgs", "darkins", "demonios", "humanos", "minotauros", "nacidos en el hielo", "criaturas del vacio", "putoto", "renacidos", "vastaya", "yeti", "yordles"];
    if (enumRace.includes(race)) {
        return { 
            check: true, 
            race
        }
    } else {
        return { 
            check: false
        }
    };
};

//Expostamos ambas funciones para usarlas en la funcion UPDATE del controlador
module.exports = { enumGenderOk, enumRaceOk};