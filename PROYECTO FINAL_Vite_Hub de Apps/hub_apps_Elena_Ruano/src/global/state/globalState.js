//INICIALIZACION - ESTADO LAZY
/**Empezamos el estado en LAZY. Esto quiere decir que mira si tenemos algun valor en el local storage */
/** - Si tenemos algun valor en el local storage lo almacena en currentUser*/
/** - Si no tenemos algun valor, currentUser será un string vacio*/

const currentUser = {
    name: sessionStorage.getItem("currentUser")
    ? sessionStorage.getItem("currentUser")
    : "",
};


/**Estos datos se guardarían en el local storage */

let userData = localStorage.getItem(currentUser.name)
    ? JSON.parse(localStorage.getItem(currentUser.name))
    : {
        name: "",
        token: false,
        fav: [],
    };


//DATA GLOBAL DE LA APLICACION
/**Es donde se van a guardar los datos que vengan de las API y que vamos a utilizarlos en la app*/

const dataGlobal = {
    pokemon: [],
};


//FUNCIONES SET Y GET
/** - Las funciones GET: nos darian el valor actual que tiene el estado
    - Las funciones SET: setean el valor que recibe como parametro en el estado que modifica
 */

//SET Y GET currentUser:
export const setUser = (username) => {
    currentUser.name = username;
};

export const getUser = () => {
    return currentUser;
};


//SET Y GET dataGlobal:
export const setData = (data, page) => {
    switch (page) {
        case "Pokemon":
        dataGlobal.pokemon = data;

        break;

        default:
            break;
    }
};

export const getData = (page) => {
    switch (page) {
        case "Pokemon":
        return dataGlobal.pokemon;
    default:
            break;
    }
    return dataGlobal;
};


//SET Y GET dde userData:
export const setUserData = (data) => {
    console.log(".....metiendo datos en el contexto");
    userData.fav = data?.fav;
    userData.name = data?.name;
    userData.token = data?.token;
    /**En este caso no solo setea sino que tambien lo modifica en el localStorage
     * Como se ve lo mete con una forma especial para que en caso de corresponder
     * el nombre que introduce en el login con el que hay en el localStorage se pueda
     * recuperar los datos de los favoritos.
     */
    const stringUser = JSON.stringify(userData);
    localStorage.removeItem(`${currentUser.name}`);
    console.log(userData.name);
    localStorage.setItem(`${currentUser.name}`, stringUser);
};

export const getUserData = () => {
    return userData;
};