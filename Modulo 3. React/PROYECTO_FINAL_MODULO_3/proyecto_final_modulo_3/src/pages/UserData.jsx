import { useAuth } from '../context';
import { FigureUser } from "../components";
import './UserData.css';


export const UserData = () => {
    const { user, setUser} = useAuth();
    console.log("este es el user del dataUser", user);
    const userParse = JSON.parse(localStorage.getItem('user'));
    console.log("este es el userParse del dataUser", userParse);


    return (
        <>
            <div className="containerDataNoChange">
                    <div className="containerProfile">
                            <FigureUser user={userParse} />
                    </div>
            </div>
        </>
        
    )
}