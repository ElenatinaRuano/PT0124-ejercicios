import './FigureUser.css';

export const FigureUser = (user) => {
    return (
        <figure className='figure_profile_1'>
            <div className="headerProfile">
                <img className='image_profile_1'  src={user.user.image} alt={'user image'}/>
                <div className="whiteContainer"></div>
                <div className="infoProfile">
                    <p>Nombre de usuario: </p>
                    <h2 className="userNameProfile">{user.user.user}</h2>
                </div>
            </div>

            <div className="whiteContainer"></div>
            
            <div className='user_info'>
                <div className="infoProfile">
                    <p>Email: </p>
                    <h3>{user.user.email}</h3>
                </div>
            </div>
        </figure>
    )
};