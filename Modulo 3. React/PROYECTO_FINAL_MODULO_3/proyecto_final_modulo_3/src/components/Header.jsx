import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import "./Header.css";

export const Header = () => {

    //Primero importamos las constantes user y logout que hemos creado en la carpeta context
    const { user, logout } = useAuth();
    console.log(user);

    return (
    <>
        <header>
            <div className="titleFatherContainer">
                <span className="material-symbols-outlined logo">face</span>

                <div className="titleContainer">
                    <h1 className="titleHeader">PÁGINA DE USUARIO</h1>
                    <h1 className="titleHeaderBlack">PÁGINA DE USUARIO</h1>
                </div>
            </div>

            
            <nav>
                {/**Para la barra de navegacion vamos a proponer distintos botones 
                 *  --> Si usuario es igual a null --> no esta logueado por lo que ponermos un icono generico en su perfil
                 */}
                {user == null && (
                    <NavLink to="/login">
                        <span className="material-symbols-outlined iconNav">login</span>
                    </NavLink>
                )}
                
                {/** --> Si usuario no es igual a null --> aparece un boton que nos lleve al dashboard
                 *   --> Si no lo esta --> NULL
                 */}
                {user !== null ? (
                    <NavLink to="/dashboard">
                        <span className="material-symbols-outlined iconNav iconDashBoard">dashboard</span>
                    </NavLink>
                ) : null}


                {/** --> Un boton de regreso a la HOME de nuestra pagina
                 */}
                <NavLink to="/">
                    <span className="material-symbols-outlined iconNav home">home</span>
                </NavLink>
                
                {/** En caso de que el usuario no sea null--> Un boton para cerrar sesion*/}
                {user !== null && (
                    <NavLink to="/">
                        <span 
                            className="material-symbols-outlined iconNav iconLogout"
                            onClick={() => logout()}
                            >move_item</span>
                    </NavLink>
                )}

                {/** En caso de que el usuario no sea NULL--> la foto de perfil sera la foto registrada del usuario */}
                {user !== null ? (
                    <NavLink to="/profile">
                        <img
                            className="profileCircle"

                            src={user.image}
                            alt={user.user}
                        />
                    </NavLink>
                ) : null}
            
            </nav>
        </header>


    </>
    )
}