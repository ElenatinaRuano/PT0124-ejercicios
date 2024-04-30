import './Profile.css'
import { Outlet } from 'react-router-dom'
import { NavProfile } from '../components'

export const Profile = () => {
    return(
        <>
            <NavProfile />
            <Outlet />
        </>
    )
};

export default Profile;