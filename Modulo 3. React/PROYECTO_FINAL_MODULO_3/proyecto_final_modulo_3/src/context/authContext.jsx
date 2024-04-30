import { createContext, useContext, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

//Creamos el contexto:
const AuthContext = createContext();

//Definimos la funcion que provee el contexto:
export const AuthContextProvider = ({ children }) => {

    //PRIMERO LAS FUNCIONES DE ESTADO DEL USUARIO USUARIO
    //1 --> creamos el estado del usuario
    const [ user, setUser ] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    //2 --> declaramos tambien el estado allUser para registrar la respuesta 200 ok del register
    const [ allUser, setAllUser ] = useState({
        data: {
            confirmationCode: '',
            user: {
                password:'',
                email: '',
            },
        },
    });

    //3 --> creamos una funcion puente para posibles problemas de asincronias
    const bridgeData = (state) => {
        const data = localStorage.getItem("data");
        const dataJson = JSON.parse(data);
        console.log(dataJson);

        switch(state) {
            case "ALLUSER":
                setAllUser(dataJson);
                localStorage.removeItem("data");
                break
            
            default:
                break;
        }
    }

    //Y LUEGO CREAMOAS LAS FUNCIONES DE ESTADO DE LA PAGINA (LOGIN Y LOGOUT) 
    //1 --> LOGIN
    const login = (data) => {
        localStorage.setItem('user', data);
        const parseUser = JSON.parse(data);
        setUser(parseUser);
    };

    //2 --> LOGOUT
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };


    //MEMORIZAMOS LOS PASOS CON USEMEMO
    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        allUser,
        setAllUser,
        bridgeData
    }), [ user, allUser ]);


    //DEVOLVEMOS EL COMPONENTE DEL CONTEXTO
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};


//POR ULTIMO EXPORTAMOS EL CUSTOM HOOK PARA USAR EL CONTEXTO QUE HEMOS CREADO
export const useAuth = () => useContext(AuthContext);