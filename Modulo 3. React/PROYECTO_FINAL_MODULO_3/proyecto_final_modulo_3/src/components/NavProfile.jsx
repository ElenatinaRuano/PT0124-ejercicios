//import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavProfile.css";
import { useDeleteUser } from "../hooks";
import { useAuth } from "../context/authContext";

export const NavProfile = () => {
    const { setUser, setDeleteUser } = useAuth();
    return (
        <div className="containerNavProfile">
            <div className="navSpace"></div>
            <div className="navOption">
                <Link to="/profile/changePassword">
                    <span className="material-symbols-outlined iconNav">lock_reset</span>
                </Link>
            </div>

            <div className="navOption">
                <Link to="/profile/updateProfile">
                    <span className="material-symbols-outlined iconNav iconChangeProfile">person_add</span>
                </Link>
            </div>

            <div className="navOption">
                <div className="deleteUser">
                    <span 
                        className="material-symbols-outlined iconNav iconDeleteUser"
                        onClick={() => useDeleteUser(setUser, setDeleteUser)}>delete_forever</span>
                </div>
            </div>
            <div className="navSpace"></div>
        </div>
    );
};